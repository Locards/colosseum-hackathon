import { Injectable } from '@nestjs/common';
import { Home } from './home.entity';
import { ProfileService } from 'src/model/profile/profile.service';
import { SpecialOfferService } from 'src/model/special_offer/specialOffer.service';

@Injectable()
export class HomeService {

    constructor(
        private profileService: ProfileService,
        private specialOfferService: SpecialOfferService
        ) {}


    async loadHome(uid: string) {
        console.log(uid)
        return new Home(
            await this.profileService.get(uid),
            await this.specialOfferService.getAll()
        )
    }






}
