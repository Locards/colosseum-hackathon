import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Affiliate } from 'src/app/model/Affiliate';
import { MarketplaceService } from '../../marketplace.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.page.html',
  styleUrls: ['./affiliates.page.scss'],
})
export class AffiliatesPage implements OnInit {

  affiliates: Affiliate[] = []
  filter: Filter = "all"

  constructor(
    private marketplaceService: MarketplaceService,
    private nav: NavController
  ) { 
    this.loadAffiliates()
  }

  ngOnInit() {}

  loadAffiliates() {
    this.marketplaceService.getAffiliates().subscribe((affiliates: Affiliate[]) => {
      this.affiliates = affiliates
    })
  }

  navigateBack() {
    this.nav.navigateBack("/tabs/marketplace/earn")
  }

  selectFilter(filter: Filter) {
    this.filter = filter
  }

  getFilterColor(filter: Filter) {
    if(this.filter == filter) return "primary"
    return "medium"
  }

}

type Filter = "all" | "active" | "notActive"
