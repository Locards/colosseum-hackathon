import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receipt } from '../receipt/receipt.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  status: string;
  @Column({type: "float"})
  tokens: number;
  @Column()
  blockchainTxId: string;
  @OneToOne(() => Receipt, (receipt) => receipt.transactions, {
    nullable: true,
  })
  receipt: Receipt;
  @ManyToOne(() => Profile, (profile) => profile.transactions)
  profile: Profile;
}
