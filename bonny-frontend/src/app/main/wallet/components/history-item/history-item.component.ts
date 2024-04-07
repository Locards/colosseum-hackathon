import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/model/Transaction';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent  implements OnInit {

  //@ts-ignore
  @Input("transaction") transaction: Transaction

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  showReceipt() {
    this.modalCtrl.create({
      component: ReceiptComponent,
      componentProps: { receipt: this.transaction.receipt }
    }).then(m => m.present())
  }

}
