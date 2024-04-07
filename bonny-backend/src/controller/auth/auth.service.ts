import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/model/profile/profile.service';
import * as crypto from 'crypto'
import * as base58 from 'bs58'
import * as nacl from 'tweetnacl'
import { PdaService } from 'src/service/solana/pda';
import { PublicKey } from '@solana/web3.js';

@Injectable()
export class AuthService {

    nonceExpiration = 300000
    nonceMap = new Map()
    nonceTimeoutMap = new Map()


    constructor(private profileService: ProfileService, private pda: PdaService) {}


    getNonce(pubkey: string) {
        let nonce = crypto.randomBytes(16).toString('hex')
        this.nonceMap.set(pubkey, nonce)
        return nonce
    }

    async hasProfile(pubkey: string) {
        const user = await this.profileService.get(pubkey)
        console.log(user)
        const hasProfile = (user != undefined)
        console.log(hasProfile)
        return hasProfile
    }

    async createProfile(pubkey: string) {
        await this.profileService.save({
            id: pubkey,
            pda: this.pda.userPubkey(new PublicKey(pubkey), new PublicKey(process.env.BONNY_PROGRAM_ID)).toBase58(),
            phoneNr: "",
            tokens: 0,
            email: `${pubkey.substring(0, 4)}..${pubkey.substring(pubkey.length-4, pubkey.length)}`,
            transactions: [],
            affiliateStatuses: [],
            questStatuses: [],
            questionAnswers:[],
            couponStatuses: []
        })
    }


    async loginWithWallet(pubkey: string, signature: string) {

        const nonce = this.nonceMap.get(pubkey)
        
        const signatureUint8 = base58.decode(signature)
        const nonceUint8 = new TextEncoder().encode(nonce)
        const pubkeyUint8 = base58.decode(pubkey)

        const verified = nacl.sign.detached.verify(nonceUint8, signatureUint8, pubkeyUint8)

        if(!verified) return {status: "failed"}


        return {status: "successful"}
    }

}
