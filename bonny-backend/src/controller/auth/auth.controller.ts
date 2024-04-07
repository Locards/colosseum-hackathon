import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SolanaService } from 'src/service/solana/solana.service';
import { Transaction } from '@solana/web3.js';


@Controller('auth')
export class AuthController {

    constructor(private adminService: AuthService, private solanaService: SolanaService) {}

    @Get()
    async getNonce(@Query("pubkey") pubkey: string) {
        const nonce = this.adminService.getNonce(pubkey)
        return { nonce: nonce }
    }

    @Post()
    async loginWithWallet(@Body("pubkey") pubkey: string, @Body("signature") signature: string) {

        if(await this.adminService.hasProfile(pubkey)) return {status: "signed_up"}


        await this.adminService.loginWithWallet(pubkey, signature)
        return {status: "new_user", ...(await this.solanaService.getUserCreationTx(pubkey))}
    }

    @Post("create")
    async createUserAccount(@Body("tx") tx: any, @Body("pubkey") pubkey: string) {
        let transaction = Buffer.from(tx, "base64")

        try {
            await this.solanaService.sendTx(transaction)
            console.log("solana user created")
            await this.adminService.createProfile(pubkey)
            
            return {status: "success"}
        } catch(e) {
            console.log("couldn't send tx")
            console.log(e)
            return {status: "error"}
        }

    }


}