use crate::*;


#[account]
#[derive(Default, Debug)]
pub struct RewardPool {
    pub bump: u8
}

impl RewardPool {
    pub const SIZE: usize = DISCRIMINATOR_LENGTH + UID + BITS_8;

    pub fn new(bump: u8) -> Self {
        Self {
            bump
        }
    }
}