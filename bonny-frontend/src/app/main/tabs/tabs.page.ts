import { Component, ElementRef, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { GalleryService } from 'src/app/receipt/service/gallery.service';
import { ScanService } from 'src/app/receipt/service/scan.service';
import Lottie from 'lottie-web'
import { AnimationOptions } from 'ngx-lottie';
import { HomeService } from '../home/home.service';
import { BehaviorSubject } from 'rxjs';
import { MarketplaceService } from '../marketplace/marketplace.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  //@ts-ignore
  @ViewChild('loadingContent') loadingContent: ElementRef


  actionsVisible: boolean = false
  loading: boolean = false
  success: boolean = false

  activeCoupons: number = 0

  successOptions: AnimationOptions = {
    path: '/assets/animations/success_receipt.json',
  }

  constructor(
    private scanService: ScanService,
    private galleryService: GalleryService,
    private nav: NavController,
    private homeService: HomeService,
  ) {
    this.listenToActiveCoupons()
  }

  listenToActiveCoupons() {
    this.homeService.getActiveCoupons$().subscribe((count: number) => {
      this.activeCoupons = count
    })
  }


  showActions() {
    this.actionsVisible = true
  }

  hideActions() {
    this.actionsVisible = false
  }

  async perfomAction(action: string) {

    switch(action) {
      case "scan":

        this.loading = true

        if(await this.scanService.scanReceipt()) {

          this.success = true

          setTimeout(() => {
            this.hideActions()
            
            setTimeout(() => {
              this.loading = false
              this.success = false
            }, 500)
          
          },2500)

          this.homeService.addPendingTransaction()
          this.homeService.pollTransactions()
          this.nav.navigateForward("/tabs/wallet/history")
          await Haptics.vibrate({duration: 300})

        } else {
          this.loading = false
        }

        break;


      case "upload":

        this.loading = true
        
        if(await this.galleryService.selectGalleryReceipts()) {
        
        this.success = true

        setTimeout(() => {
          this.hideActions()
          
          setTimeout(() => {
            this.loading = false
            this.success = false
          }, 500)
        
        },2500)

        this.homeService.addPendingTransaction()
        this.homeService.pollTransactions()
        this.nav.navigateForward("/tabs/wallet/history")
        await Haptics.vibrate({duration: 300})


        } else {
          this.loading = false
        }


        break;

      case "earn":
        this.nav.navigateForward("/tabs/marketplace/earn")
        this.hideActions()
        break;

    }


  }

}

