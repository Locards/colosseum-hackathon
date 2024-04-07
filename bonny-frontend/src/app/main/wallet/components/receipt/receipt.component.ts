import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Receipt } from 'src/app/model/Receipt';
import { ref, getDownloadURL} from "firebase/storage";
import { Storage } from '@angular/fire/storage';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {

  //@ts-ignore
  @Input("receipt") receipt: Receipt
  //@ts-ignore
  imageUrl: string = null

  constructor(private modalCtrl: ModalController, private storage: Storage) {
  }

  ngOnInit() {
    console.log(this.receipt)
    this.loadImage()


  }

  async loadImage() {
    this.imageUrl = await getDownloadURL(ref(this.storage, this.receipt.storageUrl))
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
