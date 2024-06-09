import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Quest } from 'src/app/model/Quest';
import { MarketplaceService } from '../../marketplace.service';
import { Marketplace } from 'src/app/model/Marketplace';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.page.html',
  styleUrls: ['./quests.page.scss'],
})
export class QuestsPage implements OnInit {

  quests: Quest[] = []

  constructor(
    private marketplaceService: MarketplaceService,
    private nav: NavController,
    private route: ActivatedRoute
  ) { 
    this.loadQuests()
  }

  ngOnInit() {}

  loadQuests() {
    this.marketplaceService.getMarketplace$().subscribe((marketplace: Marketplace) => {
      this.route.queryParams.subscribe(params => {
        if(params["filter"] == "bonk") this.quests = marketplace.quests.filter((quest: Quest) => quest.type == "bonk");
        else this.quests = marketplace.quests.filter((quest: Quest) => quest.type != "bonk")
      })
    })
  }

  navigateBack() {
    this.nav.navigateBack("/tabs/marketplace/earn")
  }


}
