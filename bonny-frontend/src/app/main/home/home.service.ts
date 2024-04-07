import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { PushNotificationSchema, PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Observable, tap, of, map, BehaviorSubject } from 'rxjs';
import { CouponStatus } from 'src/app/model/Coupon';
import { Home } from 'src/app/model/Home';
import { Profile } from 'src/app/model/Profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //@ts-ignore
  private home: Home

  private activatedCouponsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  //@ts-ignore
  private profileSubject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(undefined)


  constructor(private http: HttpClient, private authentication: AuthenticationService, private platform: Platform) { }


  loadHome(): Observable<Home> {
    return this.http.get<Home>(`${environment.backendUrl}/home`, {params: {uid: this.authentication.getUser().uid}}).pipe(
      tap((home: Home) => {
        this.home = home;
        this.activatedCouponsSubject.next(this.home.profile.couponStatuses.length)
        this.profileSubject.next(home.profile)
      })
    )
  }

  getProfile$() {
    return this.profileSubject;
  }

  getProfile(): Observable<Profile> {
    if(this.home) return of(this.home.profile)
    return this.loadHome().pipe(
      map(
        (home: Home) => home.profile
      )
     )
  }

  getActiveCoupons$() {
    return this.activatedCouponsSubject;
  }

  addActiveCoupon() {
    this.activatedCouponsSubject.next(this.activatedCouponsSubject.value+1)
  }

  addPendingTransaction() {

    let txs = this.profileSubject.value.transactions
    txs.push({
      type: "receipt_upload",
      status: "evaluating",
      tokens: 0,
      receipt: {
        storageUrl: "",
        supplierName: "",
        totalAmount: 0,
        receiptDate: new Date().toString(),
        hash: ""
      }
    })

    this.profileSubject.next(
      {
        ...this.profileSubject.value,
        transactions: txs
      }
    )
  }

  pollTransactions() {
    /*if(this.platform.is('android')){
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          if(notification.data['hash']) {
            this.http.get<Home>(`${environment.backendUrl}/home`,{params: {uid: this.authentication.getUser().uid}}).subscribe((home: Home) => {
                this.profileSubject.next(home.profile)
            });
          }
        }
      );
    } else {*/
      const interval = setInterval(() => {
        this.http.get<Home>(`${environment.backendUrl}/home`,{params: {uid: this.authentication.getUser().uid}}).subscribe((home: Home) => {
          if(home.profile.transactions.length == this.profileSubject.value.transactions.length) {
            this.profileSubject.next(home.profile)
            clearInterval(interval)
          }
        }) 
      },2000)
    //}
  }


}
