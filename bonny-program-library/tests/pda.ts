import { PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token';

const SEED_USER = "user";
const SEED_TOKEN_ACCOUNT = "token";
const SEED_REWARD_POOL = "reward_pool"
const SEED_GLOBAL_CONFIG = "global_config"

export function globalConfig(programId: PublicKey) {
    const [globalConfigPDA, globalConfigBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED_GLOBAL_CONFIG)
        ],
        programId
    )
    return globalConfigPDA;
}



export function user(uid: String, programId: PublicKey) {
    const [userPDA, userBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED_USER),
            Buffer.from(uid)
        ],
        programId
    )

    return userPDA;
}


export function userTokenAccount(uid: String, programId: PublicKey) {
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



export function rewardPool(programId: PublicKey) {
    const [rewardPoolPDA, rewardPoolBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED_REWARD_POOL)
        ],
        programId
    )
    return rewardPoolPDA;
}

export function rewardPoolTokenAccount(programId: PublicKey) {
    const [rpPDA, rpBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED_REWARD_POOL),
            Buffer.from(SEED_TOKEN_ACCOUNT),
        ],
        programId
    )

    return rpPDA;
}


export function ata(userPDA: PublicKey, tokenMint: PublicKey) {
    return getAssociatedTokenAddressSync(
        tokenMint,
        userPDA,
        true,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
}