import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { ReclaimController } from './reclaim.controller';
import { ReclaimService } from './reclaim.service';

@Module({
  controllers: [ReclaimController],
  providers: [ReclaimService],
  imports: [
    TransactionModule,
  ],
})
export class ReclaimModule {}
