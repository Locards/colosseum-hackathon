import { PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Injectable } from "@nestjs/common";

const SEED_USER = "user";
const SEED_TOKEN_ACCOUNT = "token";
const SEED_REWARD_POOL = "reward_pool"
const SEED_GLOBAL_CONFIG = "global_config"

@Injectable()
export class PdaService {

    globalConfig(programId: PublicKey) {
        const [globalConfigPDA, globalConfigBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_GLOBAL_CONFIG)
            ],
            programId
        )
        return globalConfigPDA;
    }

    user(uid: String, programId: PublicKey) {
        const [userPDA, userBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_USER),
                Buffer.from(uid)
            ],
            programId
        )

        return userPDA;
    }

    userPubkey(pubkey: PublicKey, programId: PublicKey) {
        const [userPDA, userBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_USER),
                pubkey.toBuffer()
            ],
            programId
        )
    
        return userPDA;
    }
    

    userTokenAccount(uid: String, programId: PublicKey) {
        const [tokenPDA, tokenBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_USER),
                Buffer.from(uid),
                Buffer.from(SEED_TOKEN_ACCOUNT),
            ],
            programId
        )

        return tokenPDA;
    }

    rewardPool(programId: PublicKey) {
        const [rewardPoolPDA, rewardPoolBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_REWARD_POOL)
            ],
            programId
        )
        return rewardPoolPDA;
    }

    rewardPoolTokenAccount(programId: PublicKey) {
        const [rpPDA, rpBump] = PublicKey.findProgramAddressSync(
            [
                Buffer.from(SEED_REWARD_POOL),
                Buffer.from(SEED_TOKEN_ACCOUNT),
            ],
            programId
        )

        return rpPDA;
    }

    ata(userPDA: PublicKey, tokenMint: PublicKey) {
        return getAssociatedTokenAddressSync(
            tokenMint,
            userPDA,
            true,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );
    }

}
