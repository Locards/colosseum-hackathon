import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Offer } from 'src/app/model/Offer';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent  implements OnInit {

  //@ts-ignore
  @Input("offer") offer: Offer

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  showOffer() {


    window.open(this.offer.externalUrl, "_blank")
    return

    this.modalCtrl.create({
      component: OfferDetailsComponent,
      componentProps: {offer: this.offer}
    }).then(modal => modal.present())
  }

}
