import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {


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

}
