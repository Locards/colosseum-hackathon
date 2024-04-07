import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Offer } from 'src/app/model/Offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent  implements OnInit {


  //@ts-ignore
  @Input("offer") offer: Offer = undefined

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
