import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, CouponStatus } from './coupons.entity';
import { CouponService } from './coupons.service';
import { CouponController } from './coupons.controller';
import { ProfileModule } from '../profile/profile.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [
    TypeOrmModule.forFeature([Coupon, CouponStatus]),
    ProfileModule,
    StatsModule
  ],
  exports: [CouponService]
})
export class CouponModule {}
