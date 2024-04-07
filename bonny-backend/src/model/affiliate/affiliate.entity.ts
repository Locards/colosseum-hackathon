import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Affiliate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  imageUrl: string;
  @Column()
  externalUrl: string;
  @OneToMany(
    () => AffiliateStatus,
    (affiliateStatus) => affiliateStatus.affiliate,
  )
  statuses: AffiliateStatus[];
}

@Entity()
export class AffiliateStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.affiliateStatuses)
  profile: Profile;
  @ManyToOne(() => Affiliate, (affiliate) => affiliate.statuses)
  affiliate: Affiliate;
  @Column()
  status: string;
  @Column()
  purchaseDate: Date;
}
