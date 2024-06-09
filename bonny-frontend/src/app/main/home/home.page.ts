import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { HomeService } from './home.service';
import { Home } from 'src/app/model/Home';
import { SpecialOffer } from 'src/app/model/SpecialOffer';
import SwiperCore, { Pagination, Autoplay, EffectCoverflow } from 'swiper'
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Dialog } from '@capacitor/dialog';
import { Profile } from 'src/app/model/Profile';

SwiperCore.use([Pagination, Autoplay, EffectCoverflow])


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //@ts-ignore
  user: User = undefined

  //@ts-ignore
  home: Home = undefined

  deals: SpecialOffer[] = []

  avatarNumber: number = 1

  constructor(
    private auth: AuthenticationService,
    private modalCtrl: ModalController,
    private nav: NavController,
    private homeService: HomeService,
    private platform: Platform
  ) {
    this.loadHome()

    this.avatarNumber = Math.ceil(Math.random() * 15)
  }

  ngOnInit() {
    this.user = this.auth.user

    if(this.platform.is('capacitor')) {
      this.addPushNotificationListener();
    }
  }

  loadHome(event?: any) {
    this.homeService.loadHome().subscribe((home: Home) => {
      this.home = home
      //this.deals = this.home.specialOffers.slice(0, 3)
      this.deals = [
        {id: 4, title: "",  description: "", imageUrl: "assets/telegram.jpeg", externalUrl: "/tabs/marketplace/earn", type: "quest"},
        {id: 5, title: "",  description: "", imageUrl: "assets/bonk.jpeg", externalUrl: "/tabs/marketplace/earn", type: "quest"},
        ]
      if(!event) this.listenToProfile()
      else event.target.complete()
    })
  }

  openDeal(offer: SpecialOffer) {
    switch(offer.type) {
      case "link":
        window.open(offer.externalUrl, "_blank")
        break;

      case "quest":
        this.nav.navigateForward(offer.externalUrl)
    }
  }

  listenToProfile() {
    this.homeService.getProfile$().subscribe((profile: Profile) => this.home.profile = profile)
}

  showProfile() {
    this.modalCtrl.create({
      component: ProfileComponent,
      componentProps: {
        avatarNumber: this.avatarNumber,
        name: this.home.profile.email
      }
    }).then(m => m.present())
  }

  showWallet() {
    this.nav.navigateForward("/tabs/wallet/overview")
  }

  showHistory() {
    this.nav.navigateForward("/tabs/wallet/history")
  }

  showAllOffers() {
    this.nav.navigateForward("/tabs/marketplace/spend")
  }

  private addPushNotificationListener() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        Dialog.alert({
          title: 'FCM Token',
          message: 'Error on registering for notifications: ' + JSON.stringify(error),
        });
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        /*Dialog.alert({
          title: notification.title,
          message: notification.body || '',
        });*/
      }
    );
  }

  getAvatar() {
    return `assets/avatars/${this.avatarNumber}.png`
  }

}
