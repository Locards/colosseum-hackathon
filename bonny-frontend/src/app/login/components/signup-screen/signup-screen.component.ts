import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.scss'],
})
export class SignupScreenComponent  implements OnInit {

  email: string = ""
  password: string = ""
  confirmPassword: string = ""
  loading: boolean = false

  constructor(private loginService: LoginService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.loginService.loading.subscribe((value) => this.loading = value)
  }

  showLogin() {
    this.loginService.changeState("login")
  }

  signUp() {
    console.log(this.email)
    console.log(this.password)

    if(this.password != this.confirmPassword) {
      this.toastCtrl.create({
        message: "The password has to be the same",
        color: "warning",
        duration: 4000,
        position: "bottom"
      }).then(t => t.present())
      return
    }

    if(this.password.length < 6) {
      this.toastCtrl.create({
        message: "The password needs to have atleast 6 characters",
        color: "warning",
        duration: 4000,
        position: "bottom"
      }).then(t => t.present())
      return
    }

    this.loginService.signUp(this.email, this.password)
  }

}
