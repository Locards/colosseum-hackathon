import { Profile } from "src/model/profile/profile.entity";
import { SpecialOffer } from "src/model/special_offer/specialOffer.entity";

export class Home {

  profile: Profile;
  specialOffers: SpecialOffer[]

  constructor(profile: Profile, specialOffers: SpecialOffer[]) {
    this.profile = profile
    this.specialOffers = specialOffers
  }
  
}
