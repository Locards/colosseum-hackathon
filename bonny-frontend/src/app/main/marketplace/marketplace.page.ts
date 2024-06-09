import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MarketplaceService } from './marketplace.service';
import { Marketplace, TMarketplace } from 'src/app/model/Marketplace';
import SwiperCore, { Navigation } from 'swiper';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { HomeService } from '../home/home.service';
import { Coupon, CouponStatus, TCoupon } from 'src/app/model/Coupon';
import { Observable, Subscription } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';
import { Offer } from 'src/app/model/Offer';
import { SuccessStatus } from './components/quest-card/quest-card.component';
import { Quest } from 'src/app/model/Quest';

SwiperCore.use([Navigation])



@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnDestroy {

  //@ts-ignore
  marketplaceSubscription: Subscription

  successOptions: AnimationOptions = {
    path: '/assets/animations/success.json',
    loop: false
  }

  offers: Offer[] = [
    {
      title: "Bonny NFT",
      imageUrl: "assets/suit.png",
      price: 1,
      details: "The holder of the NFT receives 2 perks per month",
      externalUrl: "https://mint.bonny.so"
    }
  ]

  reclaimSuccessVisible: boolean = false
  questSuccessVisible: boolean = false
  currentSuccessStatus: SuccessStatus

  constructor(
    private marketplaceService: MarketplaceService,
    private homeService: HomeService,
    private nav: NavController,
    private route: ActivatedRoute
  ) { 
    this.listenToSectionParam()
    this.listenToMarketplace()
    this.getProfile()
  }

  segment: string = "earn"

  //@ts-ignore
  marketplace: TMarketplace
  //@ts-ignore
  profile: Profile

  listenToSectionParam() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.segment = params.get("section") || "earn"
    })
  }

  forceLoadMarketplace(event: any) {
    this.marketplaceService.loadMarketplace(event)
  } 


  listenToMarketplace() {
    this.marketplaceSubscription = this.marketplaceService.getMarketplace$().subscribe((marketplace: TMarketplace) => {
      if(marketplace) this.marketplace = marketplace
      else this.marketplaceService.loadMarketplace()
      console.log("new marketplace")
    })
  }


  activateCoupon(coupon: TCoupon, event: any) {
    console.log("ACTIVATE COUPON", event)
    this.marketplaceService.activateCoupon(coupon.id).subscribe((status: CouponStatus) => {
      coupon.status = "active"
      this.homeService.addActiveCoupon()
    })
  }

  inactiveCoupons() {
    return this.marketplace.coupons.filter((coupon: TCoupon) => { 
      if(!coupon.status) return true
      return coupon.status == "active"
    })
  }

  normalQuests() {
    return this.marketplace.quests.filter((quest: Quest) => quest.type != "bonk")
  }

  bonkQuests() {
    return this.marketplace.quests.filter((quest: Quest) => quest.type == "bonk")
  }

  getProfile() {
    this.homeService.getProfile$().subscribe((profile: Profile) => this.profile = profile)
  }

  showAllCoupons() {
    this.nav.navigateForward("tabs/marketplace/earn/coupons")
  }

  showAllQuests() {
    this.nav.navigateForward("tabs/marketplace/earn/quests")
  }

  showBonkQuests() {
    this.nav.navigateForward("tabs/marketplace/earn/quests", {queryParams: {filter: "bonk"}})
  }

  showAllAffiliates() {
    this.nav.navigateForward("tabs/marketplace/earn/affiliates")
  }

  ngOnDestroy(): void {
      this.marketplaceSubscription.unsubscribe()
  }

  showSuccess(status: SuccessStatus) {
    this.currentSuccessStatus = status;
    console.log(this.currentSuccessStatus)
    if(status.type == "quest") this.showQuestSuccess()
    if(status.type == "reclaim") this.showReclaimSuccess()
  }

  showReclaimSuccess() {
    this.reclaimSuccessVisible = true
  }

  hideReclaimSuccess() {
    this.reclaimSuccessVisible = false
  }

  showQuestSuccess() {
    this.questSuccessVisible = true
  }

  hideQuestSuccess() {
    this.questSuccessVisible = false
  }

}