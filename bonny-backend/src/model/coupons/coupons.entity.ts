import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  details: string;
  @Column()
  type: string;
  @Column()
  expiryDate: Date;
  @Column()
  imageUrl: string;
  @Column({nullable: true, default: 0})
  multiplier: number;
  @OneToMany(() => CouponStatus, (couponStatus) => couponStatus.coupon)
  statuses: CouponStatus[];
}

@Entity()
export class CouponStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.couponStatuses)
  profile: Profile;
  @ManyToOne(() => Coupon, (coupon) => coupon.statuses)
  @JoinColumn({ name: "couponId" })
  coupon: Coupon;

  @Column({ nullable: false })
  couponId: number;
  @Column()
  status: string; //redeemed, expired, ...
  @Column()
  redeemDate: Date;
}
