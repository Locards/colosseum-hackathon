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
      imageUrl: "assets/nft.jpeg",
      price: 500,
      details: "The holder of the NFT receives 2 perks per month"
    },
    {
      title: "Lidl Coupon",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eo_circle_blue_white_letter-l.svg/1200px-Eo_circle_blue_white_letter-l.svg.png",
      price: 20,
      details: "Get 30% discount on your next purchase"
    },
    {
      title: "Soccer Ticket",
      imageUrl: "https://media.istockphoto.com/id/926151306/de/vektor/fu%C3%9Fball-vektor-icon.jpg?s=612x612&w=0&k=20&c=IIJ851I7XBXSbriAkGktGtc2CuiQF7SLqWX0YWrP9AQ=",
      price: 800,
      details: "Get 2 VIP Soccer tickets for Hertha BSC Berlin"
    }
  ]

  successVisible: boolean = false

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
    return this.marketplace.coupons//.filter((coupon: TCoupon) => !coupon.status)
  }

  getProfile() {
    this.homeService.getProfile().subscribe((profile: Profile) => this.profile = profile)
  }

  showAllCoupons() {
    this.nav.navigateForward("tabs/marketplace/earn/coupons")
  }

  showAllQuests() {
    this.nav.navigateForward("tabs/marketplace/earn/quests")
  }

  showAllAffiliates() {
    this.nav.navigateForward("tabs/marketplace/earn/affiliates")
  }

  ngOnDestroy(): void {
      this.marketplaceSubscription.unsubscribe()
  }

  showReclaimSuccess() {
    this.successVisible = true
  }

  hideReclaimSuccess() {
    this.successVisible = false
  }

}
