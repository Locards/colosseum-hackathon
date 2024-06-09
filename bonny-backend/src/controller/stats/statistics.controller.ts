import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from '../../model/stats/stats.service';


@Controller('stats')
export class StatisticsController {

    constructor(private statsService: StatsService){}

    @Get()
    async getStats() {
        return await this.statsService.get()
    }

}
