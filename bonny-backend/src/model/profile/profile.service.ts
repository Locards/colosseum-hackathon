import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }


  async save(profile: Profile): Promise<Profile> {
    return await this.profileRepository.save(profile);
  }

  async get(id: string): Promise<Profile> {
    return (await this.profileRepository.find(
      {
        where: {id: id},
        relations: {
          transactions: {
            receipt: true,
            questStatus: {
              quest: true
            }
          },
          couponStatuses: true
        }
      }
    ))[0];
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile> {
    await this.profileRepository.update(id, profile);
    return await this.profileRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.profileRepository.findOneByOrFail({ id: id });
    return await this.profileRepository.delete(id);
  }
}
