import { Inject, Injectable } from '@nestjs/common';
import { Proof, Reclaim } from '@reclaimprotocol/js-sdk';
import axios from 'axios';
import * as QR from 'qrcode'
import { ReclaimStatus } from 'src/model/reclaim/reclaim.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs'

@Injectable()
export class ReclaimService {


    statuses: Map<string, any> = new Map<string, any>()

    constructor(
    ) {}

    async reclaim(uid: string) {

        const APP_ID = "0xF201c09F3d9Af7dA7b633B38d4c34f9A2b32E0FA"
        
        const rClient = new Reclaim.ProofRequest(APP_ID)

        const providerIds = [
            '5e96617c-351c-4f76-a6af-556ee7fcb522', // Uber user credentials
        ];


        await rClient.buildProofRequest(providerIds[0])

        const APP_SECRET = "0xc51533e81ad365bef3a0bd031a783322bc31189ccfe171dca694252b85ab4fc5"  // your app secret key.

        rClient.setSignature(
            await rClient.generateSignature(APP_SECRET)
        )

        const { requestUrl, statusUrl } = await rClient.createVerificationRequest()

        await rClient.startSession({onSuccessCallback: this.successCallback, onFailureCallback: this.failureCallback})

        const qr = await QR.toDataURL(requestUrl)
        
        this.statuses.set(uid, {status: "pending"})

        this.pollStatus(statusUrl, uid)

        return { url: requestUrl, qr: qr }
    }

    pollStatus(url: string, uid: string) {

        const interval = setInterval(async () => {
            const res = await axios.get(url)
            if(res.data) {
                console.log(res.data)

                if(res.data.session.status == 'MOBILE_SUBMITTED'){
                    clearInterval(interval)
                    this.statuses.set(uid, {status: "successful"})
                } 
            }
        }, 2000)

    }

    async successCallback(proofs: Proof[]) {

        console.log("ON SUCCESS")
        console.log(proofs)

        /*wait this.reclaimStatusRepository.save(
            {
                id: 0,
                profile: this.profileSerivce.get()
            }
        )*/
    }

    failureCallback(error: Error) {
        console.log(error)
    }

    getStatus(uid: string) {
        return this.statuses.get(uid)
    }



    lidlReclaim() {



    }

}
