import { Module } from '@nestjs/common';
import { ReceiptDataService } from './receiptdata.service';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { SolanaModule } from '../solana/solana.module';
import { ProfileModule } from 'src/model/profile/profile.module';
import { ReceiptModule } from 'src/model/receipt/receipt.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [ReceiptDataService],
  imports: [
    TransactionModule,
    SolanaModule,
    ProfileModule,
    ReceiptModule,
    FirebaseModule,
  ],
})
export class ReceiptDataModule {}
