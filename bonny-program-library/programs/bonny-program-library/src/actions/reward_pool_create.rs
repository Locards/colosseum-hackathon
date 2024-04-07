
use anchor_spl::{associated_token::AssociatedToken, token_2022::spl_token_2022::extension::ExtensionType};

use crate::*;

#[derive(Accounts)]
pub struct RewardPoolCreate<'info> {


    #[account(
        seeds = [SEED_GLOBAL_CONFIG],
        bump
    )]
    pub global_config: Account<'info, GlobalConfig>,


    #[account(
        init,
        seeds = [SEED_REWARD_POOL],
        payer = payer,
        space = RewardPool::SIZE,
        bump
    )]
    pub reward_pool: Account<'info, RewardPool>,

    #[account(
        mut,
        seeds = [
            SEED_REWARD_POOL,
            SEED_TOKEN_ACCOUNT
        ],
        bump
    )]
    /// CHECK
    pub token_account: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK
    pub token_mint: UncheckedAccount<'info>,


    #[account(mut)]
    pub payer: Signer<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub associated_token: Program<'info, AssociatedToken>,
    pub token22_program: Program<'info, Token2022>
}


#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RewardPoolCreateParams {}


impl RewardPoolCreate<'_> {
    pub fn validate(&self, ctx: &Context<Self>, _params: &RewardPoolCreateParams) -> Result<()> {

        if ctx.accounts.payer.key() != ctx.accounts.global_config.master_authority.key() {
            panic!("Signer is not the master authority!")
        }

        Ok(())
    }

    pub fn actuate(ctx: Context<Self>, _params: RewardPoolCreateParams) -> Result<()> {

        let reward_pool = &mut ctx.accounts.reward_pool;
        **reward_pool = RewardPool::new(
            ctx.bumps.reward_pool
        );

        let rent = &Rent::from_account_info(&ctx.accounts.rent.to_account_info())?;

        let extension_sizes = ExtensionType::try_calculate_account_len::<anchor_spl::token_2022::spl_token_2022::state::Account>(&[ExtensionType::MemoTransfer]).unwrap();


        //create token account
        let token_account_creation_ix = solana_program::system_instruction::create_account(
            &ctx.accounts.payer.key(),
            &ctx.accounts.token_account.key(),
            rent.minimum_balance(extension_sizes),
            extension_sizes as u64,
            &spl_token_2022::id()
        );


        let token_creation_account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.token_account.to_account_info()
        ];

        let token_account_seeds = &[
            SEED_REWARD_POOL,
            SEED_TOKEN_ACCOUNT,
            &[ctx.bumps.token_account]
        ];

        solana_program::program::invoke_signed(
            &token_account_creation_ix,
            &token_creation_account_infos,
            &[token_account_seeds]
        )?;


        //init token account
        let token_account_init_ix = spl_token_2022::instruction::initialize_account(
            &ctx.accounts.token22_program.key(),
            &ctx.accounts.token_account.key(),
            &ctx.accounts.token_mint.key(),
            &ctx.accounts.reward_pool.key()
        )?;

        let token_init_account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.token_mint.to_account_info(),
            ctx.accounts.reward_pool.to_account_info(),
            ctx.accounts.rent.to_account_info()
        ];

        solana_program::program::invoke(
            &token_account_init_ix,
            &token_init_account_infos
        )?;


        //enable memo transfers
        let ix = spl_token_2022::extension::memo_transfer::instruction::enable_required_transfer_memos(
            ctx.accounts.token22_program.key,
                &ctx.accounts.token_account.key(),
            &ctx.accounts.reward_pool.key(),
            &[
                &ctx.accounts.reward_pool.key()
            ]
        )?;

        let account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.reward_pool.to_account_info()
        ];

        let reward_pool_seeds = &[
            SEED_REWARD_POOL,
            &[ctx.accounts.reward_pool.bump]
        ];

        solana_program::program::invoke_signed(
            &ix,
            &account_infos[..],
            &[reward_pool_seeds]
        )?;

        Ok(())
    }
}


