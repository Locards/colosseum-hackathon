import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent  implements OnInit {

  email: string = ""
  password: string = ""
  loading: boolean = false

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loading.subscribe((value) => this.loading = value)
  }

  login() {
    this.loginService.login(this.email, this.password)
  }

  loginGoogle() {
    this.loginService.loginGoogle()
  }

  showSignup() {
    this.loginService.changeState("signup")
  }
  

}
