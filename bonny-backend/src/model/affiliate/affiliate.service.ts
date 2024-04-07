import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Affiliate } from './affiliate.entity';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectRepository(Affiliate)
    private affiliateRepository: Repository<Affiliate>,
  ) {}

  async getAll(): Promise<Affiliate[]> {
    return await this.affiliateRepository.find();
  }

  async add(affiliate: Affiliate): Promise<Affiliate> {
    const newAffiliate = await this.affiliateRepository.create(affiliate);
    return await this.affiliateRepository.save(newAffiliate);
  }

  async get(id: number): Promise<Affiliate> {
    return await this.affiliateRepository.findOneBy({ id: id });
  }

  async update(id: number, profile: Partial<Affiliate>): Promise<Affiliate> {
    await this.affiliateRepository.update(id, profile);
    return await this.affiliateRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.affiliateRepository.findOneByOrFail({ id: id });
    return await this.affiliateRepository.delete(id);
  }
}
