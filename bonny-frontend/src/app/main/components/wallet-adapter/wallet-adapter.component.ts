import { Component } from '@angular/core';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { LoginService } from 'src/app/login/service/login.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-adapter',
  templateUrl: './wallet-adapter.component.html',
  styleUrls: ['./wallet-adapter.component.scss'],
})
export class WalletAdapterComponent {

  isOpen = false;
  adapters: BaseMessageSignerWalletAdapter[] = []
  //@ts-ignore
  selectedAdapter: BaseMessageSignerWalletAdapter = undefined
  connecting: boolean = false;

  constructor(private walletSerivce: WalletService, private loginService: LoginService) {
    this.adapters.push(
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    )

    this.adapters[0].readyState
  }

  showModal() {
    this.isOpen = true;
  }

  isInstalled(adapter: BaseMessageSignerWalletAdapter) {
    return adapter.readyState == WalletReadyState.Installed
  }

  getLabel() {
    if(this.selectedAdapter) {
     
      const pk = this.selectedAdapter.publicKey?.toString()
      return pk?.substring(0, 4) + "..." + pk?.substring(pk.length-4, pk.length) 
    }
    if(this.connecting) return "Connecting"
    return "Connect Wallet"
  }

  async connectWallet(adapter: BaseMessageSignerWalletAdapter) {
    this.isOpen = false;
    //@ts-ignore
    this.selectedAdapter = undefined;
    this.connecting = true;

    try {
      await adapter.connect()

      if(adapter.connected) {
        this.walletSerivce.setAdapter(adapter)
        this.selectedAdapter = adapter;
        this.loginService.loginWithWallet(adapter)
      }
    } catch(e) {
      console.log("User didn't connect")
    }

    this.connecting = false
  }

}
