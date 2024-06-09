import { Injectable, OnModuleInit } from '@nestjs/common';
import { AnchorProvider } from '@coral-xyz/anchor'
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'
import * as fs from 'fs'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { PdaService } from './pda';
import { BonnyProgramLibrary, IDL } from 'src/config/idl/bonny_program_library';

@Injectable()
export class SolanaService implements OnModuleInit {
  
  memoProgram: PublicKey;
  connection: Connection;
  provider: AnchorProvider;
  program: anchor.Program<BonnyProgramLibrary>

  constructor(
    private pda: PdaService,
  ) {}

  onModuleInit() {
    this.memoProgram = new PublicKey(process.env.MEMO_PROGRAM_ID)
    //const seed = Uint8Array.from(JSON.parse(String(fs.readFileSync(process.env.KEYPAIR))))

    const seed = String(process.env.KEYPAIR)

    const numStr = seed.slice(1, -1).split(',')
    const u8Array = new Uint8Array(numStr.map(Number))
    const keypair = Keypair.fromSecretKey(u8Array)

    this.connection = new Connection(process.env.RPC_URL)
    this.provider = new AnchorProvider(this.connection, new NodeWallet(keypair), {commitment: "confirmed"})
    this.program = new anchor.Program(IDL, new PublicKey(process.env.BONNY_PROGRAM_ID), this.provider);
  }

  async createUser(uid: string) {

    var user;

    try {
      user = this.pda.user(uid, this.program.programId);

      //@ts-ignore
      const tx = await this.program.methods.userCreateMaster({
        uid: Buffer.from(uid, "utf-8")
      })
      .accounts({
        user: user,
        payer: this.provider.wallet.publicKey,
        globalConfig: this.pda.globalConfig(this.program.programId),
        systemProgram: SystemProgram.programId,
      })
      .rpc({skipPreflight: true})

      console.log("user created: ", tx)
      return user;

    } catch(e) {
      console.log("uid is pubkey")
      return "";
    }

  }


  async increasePointsForUser(uid: string, amount: number, hash: string, reason: string) {

    var userId;

    try {
      userId = this.pda.user(uid, this.program.programId);
    } catch(e) {
      userId = this.pda.userPubkey(new PublicKey(uid), this.program.programId);
    }

    const memo = {
      reason: reason,
      hash: hash,
      url: `https://dashboard.bonny.so/transaction?hash=${hash}`,
    }

    try {
      const tx = await this.program.methods.userIncreasePoints({
        additionalPoints: new anchor.BN(amount),
        memo: JSON.stringify(memo),
      })
      .accounts({
        user: userId,
        globalConfig: this.pda.globalConfig(this.program.programId),
        payer: this.provider.wallet.publicKey,
        memoProgram: this.memoProgram,
        systemProgram: SystemProgram.programId
      })
      .rpc({skipPreflight: true});
      
      console.log("Your transaction signature", tx);
      return tx

    } catch(e) {
      console.error("Couldn't process the transaction", e)
    }
  }

  async getUserCreationTx(uid: string) {

    const user = this.pda.userPubkey(new PublicKey(uid), this.program.programId)

    let ix = (await this.program.methods.userCreate({})
    .accounts({
      user: user,
      payer: new PublicKey(uid),
      systemProgram: SystemProgram.programId
    }).instruction())

    
    const blockhash = (await this.provider.connection.getLatestBlockhash()).blockhash
/*
    tx.recentBlockhash = blockhash
    tx.feePayer = new PublicKey(uid)*/


    return {ix: ix, recentBlockhash: blockhash}
  }

  async sendTx(tx: Buffer) {
      await this.provider.connection.sendRawTransaction(tx)
  }

}
