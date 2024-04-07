import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    TransactionModule,
  ],
})
export class AdminModule {}
