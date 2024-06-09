import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, filter, map, BehaviorSubject } from 'rxjs';
import { Affiliate } from 'src/app/model/Affiliate';
import { Coupon, CouponStatus, TCoupon } from 'src/app/model/Coupon';
import { Marketplace, TMarketplace } from 'src/app/model/Marketplace';
import { Quest } from 'src/app/model/Quest';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home/home.service';
import { Profile } from 'src/app/model/Profile';
import * as _ from 'lodash'
import { SurveyAnswer } from 'src/app/model/Survey';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  //@ts-ignore
  private profile: Profile

  //@ts-ignore
  private marketplaceSubject: BehaviorSubject<TMarketplace> = new BehaviorSubject<TMarketplace>(null)

  constructor(
    private http: HttpClient,
    private homeService: HomeService,
  ) { 
    this.loadProfile()
  }

  private loadProfile() {
    this.homeService.getProfile$().subscribe((profile: Profile) => {
      this.profile = profile
    })
  }

  loadMarketplace(event?: any): void {
    this.http.get<Marketplace>(`${environment.backendUrl}/marketplace`, {params: {uid: this.profile.id}}).subscribe((marketplace: Marketplace) => 
      {
        this.updateMarketplaceObject(marketplace)
        if(event) event.target.complete()
      }
    )
  }

  updateMarketplaceObject(marketplace: Marketplace) {
    this.marketplaceSubject.next(
      this.mapMarketplaceObject(marketplace)
    )
  }


  //map additional data already known for the marketplace object
  mapMarketplaceObject(marketplace: Marketplace): TMarketplace {
    return {
      quests: marketplace.quests,
      affiliates: marketplace.affiliates,
      coupons: _.orderBy(
        marketplace.coupons.map((coupon: Coupon) => {
          return {
            ...coupon,
            status: this.profile.couponStatuses.find(status => status.couponId == coupon.id)?.status,
            loading: false
          }
        }), (coupon: TCoupon) => coupon.status, "asc"
      )
    }
  }

  getMarketplace$(): Observable<TMarketplace> {
    return this.marketplaceSubject;
  }


  getAffiliates(): Observable<Affiliate[]> {
    if(this.marketplaceSubject.value) return of(this.marketplaceSubject.value.affiliates)


    return this.marketplaceSubject.pipe(
      map(
        (marketplace: TMarketplace) => marketplace.affiliates
      )
     )
  }

  getCoupons(): Observable<TCoupon[]> {
    if(this.marketplaceSubject.value) return of(this.marketplaceSubject.value.coupons)

    return this.marketplaceSubject.pipe(
      map(
        (marketplace: TMarketplace) => marketplace.coupons
      )
     )
  }


  getQuests(): Observable<Quest[]> {
    if(this.marketplaceSubject.value) return of(this.marketplaceSubject.value.quests)

    return this.marketplaceSubject.pipe(
      map(
        (marketplace: TMarketplace) => marketplace.quests
      )
     )
  }

  activateCoupon(couponId: number): Observable<CouponStatus> {
    return this.http.post<CouponStatus>(`${environment.backendUrl}/marketplace/coupon/activate`, 
    {
      uid: this.profile.id,
      couponId: couponId
    }).pipe(
      tap((status: CouponStatus) => {
        this.profile.couponStatuses.push(status)
        this.marketplaceSubject.next(this.mapMarketplaceObject(this.marketplaceSubject.value))
      })
    )
  }

  submitSurvey(answer: SurveyAnswer) {
    return this.http.post<any>(`${environment.backendUrl}/marketplace/survey/answer`, {
      uid: this.profile.id,
      answer: answer
    }).pipe(
      tap((res: any) => {
        
        this.marketplaceSubject.next(
          {
            ...this.marketplaceSubject.value,
            quests: this.marketplaceSubject.value.quests.filter(
              (quest: Quest) => {
                if(!quest.survey) return true
                return quest.survey.id != answer.surveyId
              }
            )
          }
        )

        this.homeService.addTokens(res.gainedPoints)

      })
    )
  }


  reclaim(rid: string) {
    return this.http.post<any>(`${environment.backendUrl}/reclaim`, {
      uid: this.profile.id,
      reclaimId: rid
    })
  }

  pollReclaimStatus(rid: string) {
    return this.http.get<any>(`${environment.backendUrl}/reclaim/status`, { params: {uid: this.profile.id}})
    .pipe(
      tap((res: any) => {
        
        if(res.status != "successful") return 

        this.marketplaceSubject.next(
          {
            ...this.marketplaceSubject.value,
            quests: this.marketplaceSubject.value.quests.filter(
              (quest: Quest) => {
                if(!quest.reclaim) return true;
                return quest.reclaim.id != rid;
              }
            )
          }
        )
      })
    )
  }

  completeQuest(quest: Quest) {
    return this.http.post<any>(`${environment.backendUrl}/marketplace/quest/complete`, {uid: this.profile.id, quest: quest})
    .pipe(
      tap((res: any) => {
        this.marketplaceSubject.next(
          {
            ...this.marketplaceSubject.value,
            quests: this.marketplaceSubject.value.quests.filter(
              (q: Quest) => {
                return q.id != quest.id;
              }
            )
          }
        )

        this.homeService.addTokens(res.gainedPoints)

      })
    )
  }

}

