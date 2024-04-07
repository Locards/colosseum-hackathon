use anchor_spl::{associated_token::AssociatedToken, token_2022::spl_token_2022::extension::ExtensionType};
use crate::*;

#[derive(Accounts)]
#[instruction(params: UserCreateParams)]
pub struct UserCreate<'info> {


    #[account(
        init,
        seeds = [
            SEED_USER,
            &params.uid.as_bytes()
        ],
        payer = payer,
        space = User::SIZE,
        bump
    )]
    pub user: Account<'info, User>,

    #[account(
        mut,
        seeds = [
            SEED_USER,
            &params.uid.as_bytes(),
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
pub struct UserCreateParams {
    pub uid: String
}

impl UserCreate<'_> {
    pub fn validate(&self, _ctx: &Context<Self>, _params: &UserCreateParams) -> Result<()> {
        Ok(())
    }

    pub fn actuate(ctx: Context<Self>, params: UserCreateParams) -> Result<()> {

        let user = &mut ctx.accounts.user;
        user.uid = params.uid.clone();
        user.bump = ctx.bumps.user;


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
            SEED_USER,
            &params.uid.as_bytes(),
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
            &ctx.accounts.user.key()
        )?;

        let token_init_account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.token_mint.to_account_info(),
            ctx.accounts.user.to_account_info(),
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
            &ctx.accounts.user.key(),
            &[
                &ctx.accounts.user.key()
            ]
        )?;

        let account_infos: Vec<AccountInfo> = vec![
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.user.to_account_info()
        ];

        let user_seeds = &[
            SEED_USER,
            &params.uid.as_bytes(),
            &[ctx.accounts.user.bump]
        ];

        solana_program::program::invoke_signed(
            &ix,
            &account_infos[..],
            &[user_seeds]
        )?;

        Ok(())
    }




}


