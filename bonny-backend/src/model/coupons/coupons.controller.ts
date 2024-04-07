import { Controller, Get } from '@nestjs/common';
import { CouponService } from 'src/model/coupons/coupons.service';

@Controller('coupons')
export class CouponController {

    constructor(private couponService: CouponService) {}

    @Get()
    getCoupons() {
        return this.couponService.getAll()
    }

}
