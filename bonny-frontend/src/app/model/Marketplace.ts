import { Affiliate } from "./Affiliate";
import { Coupon, TCoupon } from "./Coupon";
import { Quest } from "./Quest";

export interface Marketplace {
    quests: Quest[];
    affiliates: Affiliate[];
    coupons: Coupon[]
}

export interface TMarketplace {
    quests: Quest[];
    affiliates: Affiliate[];
    coupons: TCoupon[];
  }
  