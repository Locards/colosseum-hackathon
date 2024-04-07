import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketplacePageRoutingModule } from '../marketplace-routing.module';

import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { AffiliateCardComponent } from './affiliate-card/affiliate-card.component';
import { QuestCardComponent } from './quest-card/quest-card.component';
import { SurveyComponent } from './survey/survey.component';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieComponent,
    MarketplacePageRoutingModule
  ],
  declarations: [
    CouponCardComponent,
    CouponDetailsComponent,
    OfferCardComponent,
    OfferDetailsComponent,
    AffiliateCardComponent,
    QuestCardComponent,
    SurveyComponent
],
exports: [
  CouponCardComponent,
  CouponDetailsComponent,
  OfferCardComponent,
  OfferDetailsComponent,
  AffiliateCardComponent,
  QuestCardComponent,
  SurveyComponent
]
})
export class MarketplaceComponentModule {}
