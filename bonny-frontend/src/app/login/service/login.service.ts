import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from '@angular/fire/auth'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseMessageSignerWalletAdapter } from '@solana/wallet-adapter-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/model/Profile';
import * as base58 from 'bs58'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  state = new BehaviorSubject<LoginState>("login")
  loading = new BehaviorSubject<boolean>(false)

  constructor(
    private nav: NavController,
    private fireAuth: Auth,
    private auth: AuthenticationService,
    private toastCtrl: ToastController,
    private http: HttpClient
    ) {
      this.fireAuth.setPersistence({type: 'LOCAL'});
    }


  changeState(state: LoginState) {
    this.state.next(state)
  }

  getState$() {
    return this.state;
  }

  async signUp(email: string, password: string) {
    this.loading.next(true)
    this.auth.isSignUp(true)
    createUserWithEmailAndPassword(this.fireAuth, email, password)
    .then(async (userCredentials: UserCredential) => {
      //this.user = userCredentials.user
      await this.signUpInBackend(userCredentials);

      this.loading.next(false)
    })
    .catch((error) => {
      this.auth.isSignUp(false)
      this.loading.next(false)
      console.error(error)
      this.toastCtrl.create({
        message: "The Email is already in use",
        color: "warning",
        duration: 2000,
        position: "bottom"
      }).then(t => t.present())
    })

  }

  private async signUpInBackend(userCredentials: UserCredential) {
    return new Promise(async (resolve, rejcet) => {
      this.http.post<Profile>(`${environment.backendUrl}/user/signup`, {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        phoneNumber: userCredentials.user.phoneNumber,
        tokens: 0
      }, { headers: new HttpHeaders({ "Authorization": "Bearer " + await userCredentials.user.getIdToken() })})
      .subscribe(() => 
        this.nav.navigateForward("/tabs/home", {replaceUrl: true})
      )
    })
  }


  login(email: string, password: string) {
    this.loading.next(true)
    this.auth.disableWeb3Login()    
    this.auth.isSignUp(false)
    signInWithEmailAndPassword(this.fireAuth, email, password)
    .then((userCredentials: UserCredential) => {
      //this.user = userCredentials.user
      this.loading.next(false)
    })
    .catch((error) => {
      this.loading.next(false)
      console.log(error)
      this.toastCtrl.create({
        message: "Invalid Email or password",
        color: "warning",
        duration: 2000,
        position: "bottom"
      }).then(t => t.present())
    })
  }

  loginGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.fireAuth, provider)
    .then(result => {

    })
    .catch((error) => {
      console.log(error)

    }) 
  }

  async loginWithWallet(adapter: BaseMessageSignerWalletAdapter) {
    this.auth.isSignUp(false)
    //signInAnonymously(this.fireAuth)
    let nonce = await this.getNonce(adapter.publicKey!!.toBase58())
    let signed = await this.signMessage(adapter, nonce)

    this.http.post(`${environment.backendUrl}/auth`,
    {
      pubkey: adapter.publicKey?.toBase58(),
      signature: base58.encode(signed)
    }).subscribe(async (response: any) => {

      if(response.status == "signed_up") {
        this.auth.setWeb3Login(adapter.publicKey!!.toBase58())
        await signInAnonymously(this.fireAuth)
        await this.fireAuth.signOut()
      } else {
        let ix = response.ix as TransactionInstruction

        ix.keys = ix.keys.map(key => {return {...key, pubkey: new PublicKey(key.pubkey)}})

        let tx = new Transaction().add(ix)
        tx.recentBlockhash = response.recentBlockhash
        tx.feePayer = adapter.publicKey!!
        console.log(adapter.publicKey)
        console.log(tx)

        let signedTx = await adapter.signTransaction(tx)

        console.log(signedTx)

        this.http.post(`${environment.backendUrl}/auth/create`, {
          tx: signedTx.serialize().toString("base64"),
          pubkey: adapter.publicKey?.toBase58()
        }).subscribe(async (response: any) => {

          if(response.status == "success") {
            this.auth.setWeb3Login(adapter.publicKey!!.toBase58())
            await signInAnonymously(this.fireAuth)
            await this.fireAuth.signOut()
          }

        })

      }


    })
  }

  getNonce(pubkey: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.backendUrl}/auth`, {
        params: { pubkey: pubkey}
      }).subscribe((response: any) => {
        resolve(response.nonce)
      })
    })
  }

  async signMessage(adapter: BaseMessageSignerWalletAdapter, message: string): Promise<Uint8Array> {
    const data = new TextEncoder().encode(message)
    const signed = await adapter.signMessage(data)
    return signed
  }

}


export type LoginState = "login" | "signup"
