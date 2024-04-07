import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private activatedCouponsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)


  constructor() { }


  getActiveCoupons$() {
    return this.activatedCouponsSubject;
  }

  setActiveCoupons(value: number) {
    this.activatedCouponsSubject.next(value);
  }

  addActiveCoupon() {
    this.activatedCouponsSubject.next(this.activatedCouponsSubject.value+1)
  }
}
