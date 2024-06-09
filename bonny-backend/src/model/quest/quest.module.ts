import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest, QuestStatus } from './quest.entity';
import { QuestService } from './quest.service';
import { ProfileModule } from '../profile/profile.module';
import { TransactionModule } from '../transaction/transaction.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  providers: [QuestService],
  imports: [
    TypeOrmModule.forFeature([Quest, QuestStatus]),
    ProfileModule,
    TransactionModule,
    StatsModule
  ],
  exports: [QuestService]
})
export class QuestModule {}
