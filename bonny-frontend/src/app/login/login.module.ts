import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { SignupScreenComponent } from './components/signup-screen/signup-screen.component';
import { WalletAdapterModule } from '../main/components/wallet-adapter/wallet-adapter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    WalletAdapterModule
  ],
  declarations: [
    LoginPage,
    LoginScreenComponent,
    SplashScreenComponent,
    SignupScreenComponent
  ]
})
export class LoginPageModule {}
