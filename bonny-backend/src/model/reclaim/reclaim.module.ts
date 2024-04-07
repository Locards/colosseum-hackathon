import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Reclaim, ReclaimStatus } from './reclaim.entity';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Reclaim, ReclaimStatus]),
  ],
  exports: []
})
export class ReclaimModule {}
