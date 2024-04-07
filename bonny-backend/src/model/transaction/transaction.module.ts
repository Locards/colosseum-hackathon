import { Module } from '@nestjs/common';
import { TransactionService as TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Module({
  providers: [TransactionService],
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionService],
})
export class TransactionModule {}
