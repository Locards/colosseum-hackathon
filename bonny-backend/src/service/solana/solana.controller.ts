import { Body, Controller, Post } from '@nestjs/common';
import { SolanaService } from './solana.service';


@Controller('solana')
export class SolanaController {

    constructor(private solana: SolanaService){}

    @Post("/user/create")
    createUser(@Body("uid") uid: string) {
        return this.solana.createUser(uid)
    }
}
