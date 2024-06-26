import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from './stats.entity';

@Module({
  providers: [StatsService],
  imports: [TypeOrmModule.forFeature([Stats])],
  exports: [StatsService]
})
export class StatsModule {}
