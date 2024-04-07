import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';


@Controller('home')
export class HomeController {

    constructor(private homeService: HomeService){}

    @Get()
    getHome(@Query("uid") uid: string) {
        return this.homeService.loadHome(uid)
    }

}
