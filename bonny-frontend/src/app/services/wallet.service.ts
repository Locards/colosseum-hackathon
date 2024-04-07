import { Injectable } from '@angular/core';
import { BaseMessageSignerWalletAdapter } from '@solana/wallet-adapter-base';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  //@ts-ignore
  adapterSubject: BehaviorSubject<BaseMessageSignerWalletAdapter> = new BehaviorSubject<BaseMessageSignerWalletAdapter>(null)

  constructor() { }

  setAdapter(adapter: BaseMessageSignerWalletAdapter) {
    this.adapterSubject.next(adapter)
  }

  getAdapter$() {
    return this.adapterSubject;
  }
}
