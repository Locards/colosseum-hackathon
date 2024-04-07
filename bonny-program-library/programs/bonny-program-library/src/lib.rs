use anchor_lang::prelude::*;

pub mod actions;
pub use actions::*;

pub mod program_wrappers;
pub use program_wrappers::*;

pub mod state;
pub use state::*;

declare_id!("7yAp4Mpxb11aaDPpRxJhxDnDJY525qTSQNSwQjfhNdnh");

#[program]
pub mod bonny_program_library {
    use super::*;

    #[access_control(ctx.accounts.validate(&ctx, &params))]
    pub fn initialize(ctx: Context<Initialize>, params: InitializeParams) -> Result<()> {
        Initialize::actuate(ctx, params)
    }

    #[access_control(ctx.accounts.validate(&ctx, &params))]
    pub fn reward_pool_create(ctx: Context<RewardPoolCreate>, params: RewardPoolCreateParams) -> Result<()> {
        RewardPoolCreate::actuate(ctx, params)
    }

    #[access_control(ctx.accounts.validate(&ctx, &params))]
    pub fn reward_pool_transfer(ctx: Context<RewardPoolTransfer>, params: RewardPoolTransferParams) -> Result<()> {
        RewardPoolTransfer::actuate(ctx, params)
    }

    #[access_control(ctx.accounts.validate(&ctx, &params))]
    pub fn user_create(ctx: Context<UserCreate>, params: UserCreateParams) -> Result<()> {
        UserCreate::actuate(ctx, params)
    }
}