import { Module } from '@nestjs/common';
import { CouponModule } from 'src/model/coupons/coupons.module';
import { AffiliateModule } from 'src/model/affiliate/affiliate.module';
import { QuestModule } from 'src/model/quest/quest.module';
import { MarketplaceController } from './marketplace.controller';
import { SurveyModule } from 'src/model/survey/survey.module';

@Module({
  controllers: [MarketplaceController],
  providers: [],
  imports: [
    CouponModule,
    AffiliateModule,
    QuestModule,
    SurveyModule
  ],
})
export class MarketplaceModule {}
