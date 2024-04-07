import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReclaimService } from './reclaim.service';


@Controller('reclaim')
export class ReclaimController {

    constructor(private reclaimService: ReclaimService) {}

    @Post()
    async reclaimProfile(@Body("uid") uid: string) {
        return await this.reclaimService.reclaim(uid)
    }

    @Get("status")
    async pollReclaim(@Query("uid") uid: string) {
        return await this.reclaimService.getStatus(uid)
    }
}