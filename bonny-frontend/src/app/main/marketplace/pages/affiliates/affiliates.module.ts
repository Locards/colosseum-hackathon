import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffiliatesPageRoutingModule } from './affiliates-routing.module';

import { AffiliatesPage } from './affiliates.page';
import { MarketplaceComponentModule } from '../../components/marketplace.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffiliatesPageRoutingModule,
    MarketplaceComponentModule
  ],
  declarations: [AffiliatesPage]
})
export class AffiliatesPageModule {}
