import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BonnyProgramLibrary } from "../target/types/bonny_program_library";
import * as pda from './pda';
import { SystemProgram, Keypair, PublicKey, LAMPORTS_PER_SOL, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, createTransferCheckedInstruction } from "@solana/spl-token";
import * as spl from '@solana/spl-token'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

describe("bonny-program-library", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
  const program = anchor.workspace.BonnyProgramLibrary as Program<BonnyProgramLibrary>;
  const provider = anchor.AnchorProvider.local();
  const seed = Uint8Array.from(JSON.parse(String(fs.readFileSync(process.env.KEYPAIR))))
  const keypair = Keypair.fromSecretKey(seed)

  let tokenMint = undefined;
  let userTokenAcc = undefined;
  const uid = makeid(28)



  it("create a spl-2022 token", async () => {

    tokenMint = await spl.createMint(
      provider.connection,
      keypair,
      keypair.publicKey,
      null,
      9,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    userTokenAcc = await spl.createAccount(
      provider.connection,
      keypair,
      tokenMint,
      keypair.publicKey,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    )

    const mintTx = await spl.mintTo(
      provider.connection,
      keypair,
      tokenMint,
      userTokenAcc,
      keypair.publicKey,
      10000 * (1e9),
      undefined,
      {skipPreflight: true},
      TOKEN_2022_PROGRAM_ID
    )

    console.log(mintTx)

  })

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize({
        masterAuthority: provider.wallet.publicKey,
        memoProgramId: memoProgram
    })
    .accounts({
      globalConfig: pda.globalConfig(program.programId),
      payer: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    })
    .rpc();

    console.log("Your transaction signature", tx);
  });


  it("creates the reward pool", async () => {
    // Add your test here.
    const tx = await program.methods.rewardPoolCreate({})
    .accounts({
      globalConfig: pda.globalConfig(program.programId),
      rewardPool: pda.rewardPool(program.programId),
      tokenAccount: pda.rewardPoolTokenAccount(program.programId),
      tokenMint: tokenMint,
      payer: provider.wallet.publicKey,
      associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
      token22Program: TOKEN_2022_PROGRAM_ID,
      systemProgram: SystemProgram.programId
    })
    .rpc();
    
    console.log("Your transaction signature", tx);
  });

  it("creates a user", async () => {

    const user = pda.user(uid, program.programId);

    //@ts-ignore
    const tx = await program.methods.userCreate({
      uid: Buffer.from(uid, "utf-8")
    })
    .accounts({
      user: user,
      payer: provider.wallet.publicKey,
      tokenAccount: pda.userTokenAccount(uid, program.programId),
      tokenMint: tokenMint,
      associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
      token22Program: TOKEN_2022_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .rpc({skipPreflight: true})

    console.log("user created: ", tx)

    const u = await program.account.user.fetch(
      pda.user(
        uid,
        program.programId
      )
    )

    console.log("user: ", u)

  })

  it("funds the reward pool", async () => {

    const transferIx = await spl.createTransferCheckedInstruction(
      userTokenAcc,
      tokenMint,
      pda.rewardPoolTokenAccount(program.programId),
      keypair.publicKey,
      10 * (1e9),
      9,
      undefined,
      TOKEN_2022_PROGRAM_ID
    )

    const message = "FUNDING REWARD POOL #1"

    const memoIx = new TransactionInstruction({
      keys: [{pubkey: keypair.publicKey, isSigner: true, isWritable: true}],
      data: Buffer.from(message, "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
    })

    const  tx = new Transaction().add(memoIx, transferIx)

    const txSig = await sendAndConfirmTransaction(
      provider.connection,
      tx,
      [keypair]
    )

    console.log("FUNDED REWARD POOL: ", tx.signature.toString())
    
  })

  it("funds a pool", async () => {

    const transferIx = await spl.createTransferCheckedInstruction(
      userTokenAcc,
      tokenMint,
      pda.userTokenAccount(uid, program.programId),
      keypair.publicKey,
      10 * (1e9),
      9,
      undefined,
      TOKEN_2022_PROGRAM_ID
    )

    const message = "FUNDING USER"

    const memoIx = new TransactionInstruction({
      keys: [{pubkey: keypair.publicKey, isSigner: true, isWritable: true}],
      data: Buffer.from(message, "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
    })

    const  tx = new Transaction().add(memoIx, transferIx)

    const txSig = await sendAndConfirmTransaction(
      provider.connection,
      tx,
      [keypair]
    )

    console.log("FUNDED REWARD POOL: ", tx.signature.toString())
    
  })


  it("sends token from reward pool to user", async () => {
    // Add your test here.
    //@ts-ignore
    const tx = await program.methods.rewardPoolTransfer({
      amount: new anchor.BN(1 * (1e9)),
      memo: "test"
    })
    .accounts({
      globalConfig: pda.globalConfig(program.programId),
      rewardPool: pda.rewardPool(program.programId),
      receiver: pda.userTokenAccount(uid, program.programId),
      tokenAccount: pda.rewardPoolTokenAccount(program.programId),
      tokenMint: tokenMint,
      memoProgram: memoProgram,
      payer: provider.wallet.publicKey,
      token22Program: TOKEN_2022_PROGRAM_ID,
      systemProgram: SystemProgram.programId
    })
    .rpc({skipPreflight: true});
    
    console.log("Your transaction signature", tx);
  });



});


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}