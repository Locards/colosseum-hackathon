import { Affiliate } from "src/model/affiliate/affiliate.entity";
import { Coupon } from "src/model/coupons/coupons.entity";
import { Quest } from "src/model/quest/quest.entity";

export class Marketplace {

  quests: Quest[];
  affiliates: Affiliate[];
  coupons: Coupon[]

  constructor(
    quests: Quest[],
    affiliates: Affiliate[],
    coupons: Coupon[]
    ) {
    this.quests = quests;
    this.affiliates = affiliates;
    this.coupons = coupons;
  }
  
}
