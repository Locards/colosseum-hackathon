import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/model/Transaction';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-quest-item',
  templateUrl: './quest-item.component.html',
  styleUrls: ['./quest-item.component.scss'],
})
export class QuestItemComponent  implements OnInit {

  //@ts-ignore
  @Input("transaction") transaction: Transaction

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  showQuest(){}


}
