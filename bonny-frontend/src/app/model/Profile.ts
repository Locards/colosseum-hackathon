import { CouponStatus } from "./Coupon";
import { Transaction } from "./Transaction";

export interface Profile {
    id: string,
    email: string,
    phoneNumber: string,
    tokens: number,
    transactions: Transaction[],
    couponStatuses: CouponStatus[]
  }
  