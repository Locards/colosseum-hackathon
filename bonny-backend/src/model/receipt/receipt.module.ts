import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';

@Module({
  providers: [ReceiptService],
  imports: [TypeOrmModule.forFeature([Receipt])],
  exports: [ReceiptService],
})
export class ReceiptModule {}
