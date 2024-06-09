import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatsModule } from 'src/model/stats/stats.module';

@Module({
  controllers: [StatisticsController],
  providers: [],
  imports: [StatsModule],
})
export class StatisticsModule {}
