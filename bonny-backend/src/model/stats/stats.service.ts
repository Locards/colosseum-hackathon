import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from './stats.entity';
import { Quest } from '../quest/quest.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) {}

  async get(): Promise<Stats> {
    return await this.statsRepository.findOneBy({ id: 1 });
  }

  async update(stats: Partial<Stats>): Promise<Stats> {
    await this.statsRepository.update(1, stats);
    return await this.statsRepository.findOneBy({ id: 1 });
  }

  async addUser() {
    const stats = await this.get()
    this.statsRepository.update(1, {...stats, totalUsers: stats.totalUsers+1})
  }
  async addQuest(quest: Quest) {
    const stats = await this.get()
    this.statsRepository.update(1, {...stats, totalQuests: stats.totalQuests+1, totalEarend: stats.totalEarend + quest.points})
  }
  async addCoupon() {
    const stats = await this.get()
    this.statsRepository.update(1, {...stats, totalCoupons: stats.totalCoupons+1})
  }
  async addReceipt(amount: number) {
    const stats = await this.get()
    this.statsRepository.update(1, {...stats, totalReceipts: stats.totalReceipts+1, totalEarend: stats.totalEarend + amount})
  }

}
