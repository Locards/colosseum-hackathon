import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { Profile } from 'src/model/profile/profile.entity';
import { ProfileService } from 'src/model/profile/profile.service';
import { StatsService } from 'src/model/stats/stats.service';
import { SolanaService } from 'src/service/solana/solana.service';

@Controller('user')
export class UserController {

    constructor(
        private profileService: ProfileService,
        private solanaService: SolanaService,
        private statsSerivce: StatsService
    ) {}

    @Post('signup')
    @UseGuards(FirebaseAuthGuard)
    async signUp(@Body() profile: any) {
        const pda = await this.solanaService.createUser(profile.id)
        await this.createProfile(this.mapToProfile(profile, pda));
        // anything else?
        await this.statsSerivce.addUser()
        return {status: "successful"}
    }

    async createProfile(profile: Profile): Promise<Profile> {
        return await this.profileService.save(profile);
    }

    mapToProfile(json, pda): Profile {
        const profile = new Profile();
        profile.id = json.id;
        profile.pda = pda.toString();
        profile.phoneNr = json.phoneNumber;
        profile.email = json.email;
        profile.tokens = json.tokens;
        return profile;
    }
}