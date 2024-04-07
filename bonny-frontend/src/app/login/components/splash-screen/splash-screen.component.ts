import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent  implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit() {}

  showLogin() {
    this.loginService.changeState("login")
  }

  showSignup() {
    this.loginService.changeState("signup")
  }

}
