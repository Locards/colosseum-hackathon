import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketplacePageRoutingModule } from './marketplace-routing.module';

import { MarketplacePage } from './marketplace.page';
import { MarketplaceComponentModule } from './components/marketplace.components.module';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, {EffectFade} from 'swiper'
import { LottieComponent } from 'ngx-lottie';

SwiperCore.use([EffectFade])

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketplaceComponentModule,
    MarketplacePageRoutingModule,
    LottieComponent,
    SwiperModule,
  ],
  declarations: [
    MarketplacePage
]
})
export class MarketplacePageModule {}
