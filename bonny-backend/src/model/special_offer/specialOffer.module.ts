import { Module } from '@nestjs/common';
import { SpecialOfferService } from './specialOffer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialOffer } from './specialOffer.entity';

@Module({
  providers: [SpecialOfferService],
  imports: [TypeOrmModule.forFeature([SpecialOffer])],
  exports: [SpecialOfferService],
})
export class SpecialOfferModule {}
