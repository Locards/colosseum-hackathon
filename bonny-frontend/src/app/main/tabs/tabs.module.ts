import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ReceiptModule } from 'src/app/main/wallet/components/receipt/receipt.module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReceiptModule,
    LottieComponent
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
