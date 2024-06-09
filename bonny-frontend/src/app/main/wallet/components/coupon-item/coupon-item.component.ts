import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/model/Transaction';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.scss'],
})
export class CouponItemComponent  implements OnInit {

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
