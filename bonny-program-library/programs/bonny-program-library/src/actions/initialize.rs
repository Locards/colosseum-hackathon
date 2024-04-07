
use crate::*;

#[derive(Accounts)]
pub struct Initialize<'info> {


    #[account(
        init,
        seeds = [SEED_GLOBAL_CONFIG],
        payer = payer,
        space = GlobalConfig::SIZE,
        bump
    )]
    pub global_config: Account<'info, GlobalConfig>,

    #[account(mut)]
    pub payer: Signer<'info>,

    system_program: Program<'info, System>
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InitializeParams {
    pub master_authority: Pubkey,
    pub memo_program_id: Pubkey
}

impl Initialize<'_> {
    pub fn validate(&self, _ctx: &Context<Self>, _params: &InitializeParams) -> Result<()> {
        Ok(())
    }

    pub fn actuate(ctx: Context<Self>, params: InitializeParams) -> Result<()> {

        let global_config = &mut ctx.accounts.global_config;
        **global_config = GlobalConfig::new(
            params.master_authority,
            params.memo_program_id,
            ctx.bumps.global_config
        );

        Ok(())
    }
}


