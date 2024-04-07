import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'marketplace/:section',
        children: [
          {
            path: '',
            loadChildren: () => import('../marketplace/marketplace.module').then(m => m.MarketplacePageModule),
          },
          {
            path: 'affiliates',
            loadChildren: () => import('../marketplace/pages/affiliates/affiliates.module').then( m => m.AffiliatesPageModule)
          },
          {
            path: 'coupons',
            loadChildren: () => import('../marketplace/pages/coupons/coupons.module').then( m => m.CouponsPageModule)
          },
          {
            path: 'quests',
            loadChildren: () => import('../marketplace/pages/quests/quests.module').then( m => m.QuestsPageModule)
          },
        ]
      },
      {
        path: 'wallet/:section',
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('../analytics/analytics.module').then(m => m.AnalyticsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
