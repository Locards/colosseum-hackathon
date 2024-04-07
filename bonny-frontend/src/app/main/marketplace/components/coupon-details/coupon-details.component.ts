import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Coupon, TCoupon } from 'src/app/model/Coupon';
import { ScanService } from 'src/app/receipt/service/scan.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss'],
})
export class CouponDetailsComponent  implements OnInit {
  
  //@ts-ignore
  @Input("coupon") coupon: TCoupon = undefined

  constructor(
    private modalCtrl: ModalController,
    private scanService: ScanService

  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss()
  }

  activateCoupon() {
    this.modalCtrl.dismiss("activate")
  }

  async scanReceipt() {
    const success = await this.scanService.scanReceipt()

    if(success) this.dismiss()
    
  }

}
