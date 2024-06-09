import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {


  @Input("avatarNumber") avatarNumber: number = 0
  @Input("name") name: string = ""

  constructor(private modalCtrl: ModalController, private fireAuth: Auth, private toastCtrl: ToastController, private nav: NavController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  logout() {
    this.fireAuth.signOut()
    .then(() => {

      this.dismiss()

      this.toastCtrl.create({
        message: "Signed Out successfully!",
        duration: 2000,
        color: "success"
      }).then(t => t.present())
      this.nav.navigateBack("/login")
    })
    .catch()
  }

  showToc() {
    window.open("https://bonny.so/toc", "_blank")
  }

  showPrivacy() {
    window.open("https://bonny.so/privacy-statement", "_blank")
  }

  getAvatar() {
    return `assets/avatars/${this.avatarNumber}.png`
  }

}
