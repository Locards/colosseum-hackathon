import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletAdapterComponent } from './wallet-adapter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    WalletAdapterComponent
  ],

  exports: [
    WalletAdapterComponent
  ]
})
export class WalletAdapterModule {}
