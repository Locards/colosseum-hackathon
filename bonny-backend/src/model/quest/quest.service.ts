import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest, QuestStatus } from './quest.entity';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private questRepository: Repository<Quest>,
    @InjectRepository(QuestStatus)
    private statusRepository: Repository<QuestStatus>,
    private profileService: ProfileService
  ) {}

  async getAllActiveQuestsForUser(uid: string): Promise<Quest[]> {
    const quests = await this.questRepository.createQueryBuilder('quest')
    .leftJoinAndSelect('quest.reclaim', 'reclaim')
    .leftJoinAndSelect('quest.survey', 'survey')
    .leftJoinAndSelect('survey.questions', 'question')
    .leftJoinAndSelect('question.options', 'option')
    .where(qb => {
      // Subquery to select quests that do have a status for this user
      const subQuery = qb.subQuery()
        .select('questStatus.questId')
        .from(QuestStatus, 'questStatus')
        .where('questStatus.questId = quest.id')
        .andWhere('questStatus.profileId = :uid', { uid }) // Filtering by the user ID
        .getQuery();
      return `NOT EXISTS ${subQuery}`; // Ensuring the quest does not have a status for this user
    })
    .getMany();

    return quests;
  }


  async completeQuest(uid: string, qid: number): Promise<any> {
    return await this.statusRepository.save({
      id: 0,
      profile: await this.profileService.get(uid),
      quest: await this.get(qid),
      status: "done",
      completedDate: new Date()
    })
    
  }

  async add(quest: Quest): Promise<Quest> {
    const newquest = await this.questRepository.create(quest);
    return await this.questRepository.save(newquest);
  }

  async get(id: number): Promise<Quest> {
    return await this.questRepository.findOneBy({ id: id });
  }

  async update(id: number, profile: Partial<Quest>): Promise<Quest> {
    await this.questRepository.update(id, profile);
    return await this.questRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.questRepository.findOneByOrFail({ id: id });
    return await this.questRepository.delete(id);
  }
}
