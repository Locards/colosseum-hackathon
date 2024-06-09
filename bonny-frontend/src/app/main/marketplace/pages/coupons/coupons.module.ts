import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CouponsPageRoutingModule } from './coupons-routing.module';
import { CouponsPage } from './coupons.page';
import { MarketplaceComponentModule } from '../../components/marketplace.components.module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponsPageRoutingModule,
    LottieComponent,
    MarketplaceComponentModule
  ],
  declarations: [CouponsPage]
})
export class CouponsPageModule {}
