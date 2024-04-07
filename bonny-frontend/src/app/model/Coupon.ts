export interface Coupon {
    id: number,
    title: string,
    description: string,
    details: string,
    type: string,
    expiryDate: string,
    imageUrl: string,
}

export interface TCoupon extends Coupon {
    status: string | undefined 
}

export interface CouponStatus {
    id: number,
    couponId: number,
    status: string,
    redeemDate: string
}

