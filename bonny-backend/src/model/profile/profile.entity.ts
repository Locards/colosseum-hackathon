import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AffiliateStatus } from '../affiliate/affiliate.entity';
import { QuestStatus } from '../quest/quest.entity';
import { CouponStatus } from '../coupons/coupons.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Answer } from '../survey/survey.entity';

@Entity()
export class Profile {
  @PrimaryColumn({
    type: "varchar",
    length: 255
  })
  id: string;

  @Column({
    type: "varchar",
    length: 255
  })
  pda: string;

  @Column({
      nullable: true
    })
  email: string;
  @Column({
    nullable: true
  })
  phoneNr: string;
  @Column({type: "float"})
  tokens: number;
  @OneToMany(() => Transaction, (transaction) => transaction.profile)
  transactions: Transaction[];
  @OneToMany(
    () => AffiliateStatus,
    (affiliateStatus) => affiliateStatus.profile,
  )
  affiliateStatuses: AffiliateStatus[];
  @OneToMany(() => QuestStatus, (questStatus) => questStatus.profile)
  questStatuses: QuestStatus[];
  @OneToMany(() => CouponStatus, (couponStatus) => couponStatus.profile)
  couponStatuses: CouponStatus[];
  @OneToMany(() => Answer, (answer) => answer.profile)
  questionAnswers: Answer[];
}
