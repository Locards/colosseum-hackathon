import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Quest } from 'src/app/model/Quest';
import { MarketplaceService } from '../../marketplace.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.page.html',
  styleUrls: ['./quests.page.scss'],
})
export class QuestsPage implements OnInit {

  quests: Quest[] = []

  constructor(
    private marketplaceService: MarketplaceService,
    private nav: NavController
  ) { 
    this.loadQuests()
  }

  ngOnInit() {
  }

  loadQuests() {
    this.marketplaceService.getQuests().subscribe((quests: Quest[]) => {
      this.quests = quests
    })
  }

  navigateBack() {
    this.nav.navigateBack("/tabs/marketplace/earn")
  }


}
