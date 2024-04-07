import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Affiliate } from './affiliate.entity';
import { AffiliateService } from './affiliate.service';

@Controller('affiliate')
export class AffiliateController {
  constructor(private affiliateService: AffiliateService) {}
  @Get()
  getAll() {
    return this.affiliateService.getAll();
  }
  @Post()
  add(@Body() user: Affiliate) {
    return this.affiliateService.add(user);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.affiliateService.get(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Affiliate) {
    return this.affiliateService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.affiliateService.remove(id);
  }
}
