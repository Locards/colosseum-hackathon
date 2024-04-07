use crate::*;

#[derive(Accounts)]
pub struct RewardPoolTransfer<'info> {


    #[account(
        seeds = [SEED_GLOBAL_CONFIG],
        bump
    )]
    pub global_config: Account<'info, GlobalConfig>,


    #[account(
        seeds = [SEED_REWARD_POOL],
        bump
    )]
    pub reward_pool: Account<'info, RewardPool>,

    #[account(mut)]
    ///CHECK
    pub receiver: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK
    pub token_mint: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK
    pub token_account: UncheckedAccount<'info>,

    #[account(mut)]
    ///CHECK
    pub memo_program: UncheckedAccount<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,
    
    pub token22_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
}


#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RewardPoolTransferParams {
    amount: u64,
    memo: String
}


impl RewardPoolTransfer<'_> {
    pub fn validate(&self, ctx: &Context<Self>, _params: &RewardPoolTransferParams) -> Result<()> {

        if ctx.accounts.payer.key() != ctx.accounts.global_config.master_authority.key() {
            panic!("Signer is not the master authority!")
        }

        Ok(())
    }

    pub fn actuate(ctx: Context<Self>, params: RewardPoolTransferParams) -> Result<()> {


        let memo_ix = solana_program::instruction::Instruction::new_with_bytes(
            ctx.accounts.memo_program.key(),
            &params.memo.as_bytes(),
            vec![
                AccountMeta::new(ctx.accounts.payer.key(), true)
            ]);

        solana_program::program::invoke(
            &memo_ix,
             &vec![
                ctx.accounts.payer.to_account_info(),
                ctx.accounts.memo_program.to_account_info()
        ])?;

        let token_transfer_ix = spl_token_2022::instruction::transfer_checked(
            &ctx.accounts.token22_program.key(),
            &ctx.accounts.token_account.key(),
            &ctx.accounts.token_mint.key(),
            &ctx.accounts.receiver.key(),
            &ctx.accounts.reward_pool.key(),
            &[
                &ctx.accounts.reward_pool.key()
            ],
            params.amount,
            TOKEN_DECIMALS
        )?;


        let account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.reward_pool.to_account_info(),
            ctx.accounts.token_mint.to_account_info(),
            ctx.accounts.receiver.to_account_info(),
        ];

        let reward_pool_seeds = &[
            SEED_REWARD_POOL,
            &[ctx.accounts.reward_pool.bump]
        ];


        solana_program::program::invoke_signed(
            &token_transfer_ix,
            &account_infos[..],
            &[reward_pool_seeds]
        )?;


        Ok(())
    }
}


