use crate::*;


#[account]
#[derive(Default, Debug)]
pub struct GlobalConfig {
    pub master_authority: Pubkey,
    pub memo_program_id: Pubkey,
    pub bump: u8
}

impl GlobalConfig {
    pub const SIZE: usize = DISCRIMINATOR_LENGTH + PUBLIC_KEY_LENGTH + PUBLIC_KEY_LENGTH + BITS_8;

    pub fn new(master_authority: Pubkey, memo_program_id: Pubkey, bump: u8) -> Self {
        Self {
            master_authority,
            memo_program_id,
            bump
        }
    }
}