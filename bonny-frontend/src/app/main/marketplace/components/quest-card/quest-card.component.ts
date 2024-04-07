import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Quest } from 'src/app/model/Quest';
import { SurveyComponent } from '../survey/survey.component';
import { MarketplaceService } from '../../marketplace.service';
import { ReclaimAction } from 'src/app/model/Reclaim';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.component.html',
  styleUrls: ['./quest-card.component.scss'],
})
export class QuestCardComponent implements OnInit {

  //@ts-ignore
  @Input("quest") quest: Quest

  @Output("onSuccess") onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>()

  loading: boolean = false
  image: string = ""

  constructor(
    private modalCtrl: ModalController,
    private marketplaceService: MarketplaceService,
  ) { }

  ngOnInit() {}

  startQuest() {
    if(this.quest.survey) {
      this.modalCtrl.create({
        component: SurveyComponent,
        componentProps: {
          survey: this.quest.survey,
          questId: this.quest.id
        }
      }).then(m => m.present())
    }

    if(this.quest.reclaim) {
      this.loading = true;

      this.marketplaceService.reclaim(this.quest.reclaim!!.id).subscribe((res: ReclaimAction) => {
        location.replace(res.url)
        //window.open(res.url, '_blank')
        console.log(res)
        //this.image = res.qr
        this.pollReclaimStatus()
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

          this.showReclaimSuccess()
        }
      })
    }, 4000)

  }


  showReclaimSuccess() {
    this.onSuccess.next(true)
  }

}
