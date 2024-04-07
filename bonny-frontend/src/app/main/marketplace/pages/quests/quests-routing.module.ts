import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestsPage } from './quests.page';

const routes: Routes = [
  {
    path: '',
    component: QuestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestsPageRoutingModule {}
