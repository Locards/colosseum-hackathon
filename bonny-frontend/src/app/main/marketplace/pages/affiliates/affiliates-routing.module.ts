import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffiliatesPage } from './affiliates.page';

const routes: Routes = [
  {
    path: '',
    component: AffiliatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliatesPageRoutingModule {}
