import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ProfileComponent } from '../components/profile/profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SwiperModule } from 'swiper/angular';
import { WalletAdapterModule } from '../components/wallet-adapter/wallet-adapter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgApexchartsModule,
    SwiperModule,
    WalletAdapterModule
  ],
  declarations: [
    HomePage,
    ProfileComponent
  ]
})
export class HomePageModule {}
