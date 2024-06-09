import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { QuestItemComponent } from './components/quest-item/quest-item.component';
import { CouponItemComponent } from './components/coupon-item/coupon-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule
  ],
  declarations: [
    WalletPage,
    HistoryItemComponent,
    QuestItemComponent,
    ReceiptComponent,
    CouponItemComponent
  ]
})
export class WalletPageModule {}
