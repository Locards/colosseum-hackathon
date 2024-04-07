import { Component, OnInit } from '@angular/core';
import { LoginService, LoginState } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  state: LoginState = "splash"

  constructor(private loginService: LoginService) {
    loginService.getState$().subscribe((state) => {
      this.state = state
    })
  }

  ngOnInit() {}

  showSplash() {
    this.loginService.changeState("splash")
  }

}
