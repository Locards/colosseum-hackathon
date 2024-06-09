import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Survey } from '../survey/survey.entity';
import { Reclaim } from '../reclaim/reclaim.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column()
  imageUrl: string;
  @Column({default: ""})
  externalUrl: string;
  @Column({default: 0, type: "float"})
  points: number;
  @Column({default: true})
  enabled: boolean;
  @OneToMany(() => QuestStatus, (questStatus) => questStatus.quest)
  statuses: QuestStatus[];
  @OneToOne(() => Survey, (survey) => survey.quest)
  @JoinColumn()
  survey: Survey;
  @JoinColumn()
  @OneToOne(() => Reclaim, (reclaim) => reclaim.quest)
  reclaim: Reclaim;

}

@Entity()
export class QuestStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.questStatuses)
  profile: Profile;
  @ManyToOne(() => Quest, (quest) => quest.statuses)
  quest: Quest;
  @Column()
  status: string;
  @Column()
  completedDate: Date;
  @JoinColumn()
  @OneToOne(() => Transaction, (transaction) => transaction.questStatus)
  transaction: Transaction;
}
