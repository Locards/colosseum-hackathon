import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CouponStatus, TCoupon } from 'src/app/model/Coupon';
import { MarketplaceService } from '../../marketplace.service';
import { HomeService } from 'src/app/main/home/home.service';
import { Profile } from 'src/app/model/Profile';
import * as _ from 'lodash'

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {

  //@ts-ignore
  profile: Profile
  coupons: TCoupon[] = []
  visibleCoupons: TCoupon[] = []
  filter: Filter = "all"

  constructor(
    private marketplaceService: MarketplaceService,
    private homeService: HomeService,
    private nav: NavController
  ) { 
    this.load()
  }

  ngOnInit() {}


  async load() {
    await this.loadProfile()
    await this.loadCoupons()
  }

  async loadProfile() {
    return new Promise((resolve, reject) => {
      this.homeService.getProfile().subscribe((profile: Profile) => {
        this.profile = profile
        resolve(true)
      })
    })
  }

  loadCoupons() {
    return new Promise((resolve, reject) => {
      this.marketplaceService.getCoupons().subscribe((coupons: TCoupon[]) => {
        this.coupons = coupons
        resolve(true)
      })
    })
  }

  getVisibleCoupons() {
    switch(this.filter) {
      case "all": return this.coupons
      case "active": return this.coupons.filter((coupon: TCoupon) => coupon.status == "active")
      case "notActive": return this.coupons.filter((coupon: TCoupon) => !coupon.status)
    }
  }


  activateCoupon(coupon: TCoupon, event: any) {
    console.log("ACTIVATE COUPON", event)
    this.marketplaceService.activateCoupon(coupon.id).subscribe((status: CouponStatus) => {
      coupon.status = "active"
      this.homeService.addActiveCoupon()
    })
  }

  navigateBack() {
    this.nav.navigateBack("/tabs/marketplace/earn")
  }

  selectFilter(filter: Filter) {
    this.filter = filter
  }

  getFilterColor(filter: Filter) {
    if(this.filter == filter) return "primary"
    return "medium"
  }

}

type Filter = "all" | "active" | "notActive"