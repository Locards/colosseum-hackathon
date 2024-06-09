import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AffiliateService } from 'src/model/affiliate/affiliate.service';
import { CouponService } from 'src/model/coupons/coupons.service';
import { QuestService } from 'src/model/quest/quest.service';
import { Marketplace } from './marketplace.entity';
import { SurveyService } from 'src/model/survey/survey.service';
import { Quest } from 'src/model/quest/quest.entity';

@Controller('marketplace')
export class MarketplaceController {

    constructor(
        private couponService: CouponService,
        private affiliateService: AffiliateService,
        private questService: QuestService,
        private surveyService: SurveyService
    ) {}

    @Get()
    async loadMarketplaceForUser(@Query("uid") uid: string) {

        return new Marketplace(
            await this.questService.getAllActiveQuestsForUser(uid),
            await this.affiliateService.getAll(),
            await this.couponService.getAll()
        )
    }

    @Post("coupon/activate")
    async activateCouponForUser(@Body("uid") uid: string, @Body("couponId") cid: number) {
        return await this.couponService.activateCoupon(uid, cid)
    }


    @Post("survey/answer")
    async answerSurveyForUser(@Body("uid") uid: string, @Body("answer") answer: SurveyAnswer) {
        const res = await this.questService.completeQuest(uid, answer.questId)
        await this.surveyService.submitAnswer(uid, answer)
        return res
    }

    @Post("quest/complete")
    async completeSimpleQuest(@Body("uid") uid: string, @Body("quest") quest: Quest) {
        const res = await this.questService.completeQuest(uid, quest.id)
        return res
    }
}

export interface SurveyAnswer {
    questId?: number,
    surveyId: number,
    answers: {
        questionId: number,
        optionId?: number,
        freeText?: string
    }[]
}

