import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliate, AffiliateStatus } from './affiliate.entity';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';

@Module({
  controllers: [AffiliateController],
  providers: [AffiliateService],
  imports: [TypeOrmModule.forFeature([Affiliate, AffiliateStatus])],
  exports: [AffiliateService]
})
export class AffiliateModule {}
