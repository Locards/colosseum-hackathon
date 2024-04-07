import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, CouponStatus } from './coupons.entity';
import { CouponService } from './coupons.service';
import { CouponController } from './coupons.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [
    TypeOrmModule.forFeature([Coupon, CouponStatus]),
    ProfileModule
  ],
  exports: [CouponService]
})
export class CouponModule {}
