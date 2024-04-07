import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth'
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //@ts-ignore
  user: User = undefined
  web3Login: boolean = false
  web3Pubkey: string = ""

  signUp: boolean = false
  
  constructor(private fireAuth: Auth, private nav: NavController) {
    this.listenToUser()
   }

  private listenToUser() {
    onAuthStateChanged(this.fireAuth, (user: User | null) => {
      console.log("AUTH STATE CHANGED:", user)
      if(user) {
        this.user = user
        //TODO remove timeout. Added because of race condition!
        //if(!this.signUp) setTimeout(() => this.nav.navigateForward("/tabs/home", {replaceUrl: true}), 2000);
        if(!this.signUp) this.nav.navigateForward("/tabs/home", {replaceUrl: true})
      } else {
        if(!this.web3Login) {
          //@ts-ignore
          this.user = undefined
          this.nav.navigateForward("/login", {replaceUrl: true})
        }
      }
    })
  }

  getUser() {
    if(!this.web3Login) return this.user;
    return {uid: this.web3Pubkey}
  }

  isSignUp(value: boolean) {
    this.signUp = value
  }

  setWeb3Login(pubkey: string) {
    this.web3Pubkey = pubkey
    this.web3Login = true;
  }

  disableWeb3Login() {
    this.web3Login = false;
  }

  getCurrentUid()  {
    if(this.web3Login) return this.web3Pubkey;
    return this.user.uid;
  }

}
