import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Quest } from 'src/app/model/Quest';
import { SurveyComponent } from '../survey/survey.component';
import { MarketplaceService } from '../../marketplace.service';
import { ReclaimAction } from 'src/app/model/Reclaim';
import { HomeService } from 'src/app/main/home/home.service';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.component.html',
  styleUrls: ['./quest-card.component.scss'],
})
export class QuestCardComponent implements OnInit {

  //@ts-ignore
  @Input("quest") quest: Quest

  @Output("onSuccess") onSuccess: EventEmitter<SuccessStatus> = new EventEmitter<SuccessStatus>()

  loading: boolean = false
  image: string = ""

  constructor(
    private modalCtrl: ModalController,
    private marketplaceService: MarketplaceService,
    private homeService: HomeService
  ) { }

  ngOnInit() {}

  async startQuest() {
    if(this.quest.survey) {
      const modal = await this.modalCtrl.create({
        component: SurveyComponent,
        componentProps: {
          survey: this.quest.survey,
          questId: this.quest.id
        }
      })
      
    modal.present();
    
    const res = await modal.onWillDismiss() 

    if(res.data.status == "success") {
      this.showQuestSuccess(res.data.earnedPoints)
    }

    }

    else if(this.quest.reclaim) {
      this.loading = true;

      this.marketplaceService.reclaim(this.quest.reclaim!!.id).subscribe((res: ReclaimAction) => {
        location.replace(res.url)
        //window.open(res.url, '_blank')
        console.log(res)
        //this.image = res.qr
        this.pollReclaimStatus()
      })

    }

    else {
      window.open(this.quest.externalUrl)
      this.marketplaceService.completeQuest(this.quest).subscribe((res) => {
        this.showQuestSuccess(res.gainedPoints)
        this.homeService.pollTransactions()
      })
    }
    
  }

  pollReclaimStatus() {

    const interval = setInterval(() => {
      this.marketplaceService.pollReclaimStatus(this.quest.reclaim!!.id).subscribe((res: any) => {
        console.log(res)

        if(res.status == "successful") {
          this.loading = false;
          clearInterval(interval)

          this.showReclaimSuccess(Number(res.extractedData))
        }
      })
    }, 4000)

  }


  showReclaimSuccess(earnedPoints: number) {
    this.onSuccess.next({type: "reclaim", status: true, earnedPoints: earnedPoints})
  }

  showQuestSuccess(earnedPoints: number) {
    this.onSuccess.next({type: "quest", status: true, earnedPoints: earnedPoints})
  }

}

export interface SuccessStatus {
  type: "reclaim" | "quest",
  status: boolean,
  earnedPoints: number
}