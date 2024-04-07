use crate::*;


#[account]
#[derive(Default, Debug)]
pub struct User {
    pub uid: String,
    pub points: u64,
    pub bump: u8
}

impl User {
    pub const SIZE: usize = DISCRIMINATOR_LENGTH + UID + BITS_64 + BITS_8;


    pub fn new(uid: String, points: u64,bump: u8) -> Self {
        Self {
            uid,
            points,
            bump
        }
    }
}