import { Injectable } from '@nestjs/common';
import { SpecialOffer } from './specialOffer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ggf. besser keine Datenbank View, sondern hier zusammenbauen
@Injectable()
export class SpecialOfferService {
  constructor(
    @InjectRepository(SpecialOffer)
    private specialOfferRepository: Repository<SpecialOffer>,
  ) {}

  async getAll(): Promise<SpecialOffer[]> {
    return await this.specialOfferRepository.find();
  }
}
