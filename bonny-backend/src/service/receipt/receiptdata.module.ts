import { Module } from '@nestjs/common';
import { ReceiptDataService } from './receiptdata.service';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { SolanaModule } from '../solana/solana.module';
import { ProfileModule } from 'src/model/profile/profile.module';
import { ReceiptModule } from 'src/model/receipt/receipt.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CouponStatus } from 'src/model/coupons/coupons.entity';
import { CouponModule } from 'src/model/coupons/coupons.module';
import { StatsModule } from 'src/model/stats/stats.module';

@Module({
  providers: [ReceiptDataService],
  imports: [
    TransactionModule,
    SolanaModule,
    ProfileModule,
    ReceiptModule,
    FirebaseModule,
    CouponModule,
    StatsModule
  ],
})
export class ReceiptDataModule {}
