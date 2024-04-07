import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon, CouponStatus } from './coupons.entity';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    @InjectRepository(CouponStatus)
    private couponStatusRepository: Repository<CouponStatus>,
    private profileService: ProfileService,

  ) {}

  async getAll(): Promise<Coupon[]> {
    return await this.couponRepository.find();
  }

  async add(coupon: Coupon): Promise<Coupon> {
    const newCoupon = await this.couponRepository.create(coupon);
    return await this.couponRepository.save(newCoupon);
  }

  async get(id: number): Promise<Coupon> {
    return await this.couponRepository.findOneBy({ id: id });
  }

  async update(id: number, profile: Partial<Coupon>): Promise<Coupon> {
    await this.couponRepository.update(id, profile);
    return await this.couponRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.couponRepository.findOneByOrFail({ id: id });
    return await this.couponRepository.delete(id);
  }


  async activateCoupon(uid: string, cid: number): Promise<CouponStatus> {

    let status: CouponStatus = {
      id: 0,
      profile: await this.profileService.get(uid),
      coupon: await this.get(cid),
      couponId: cid,
      status: "active",
      redeemDate: new Date()
    }

    return await this.couponStatusRepository.save(status)
  }

}
