import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest, QuestStatus } from './quest.entity';
import { ProfileService } from '../profile/profile.service';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from '../transaction/transaction.entity';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private questRepository: Repository<Quest>,
    @InjectRepository(QuestStatus)
    private statusRepository: Repository<QuestStatus>,
    private profileService: ProfileService,
    private transactionService: TransactionService,
    private stats: StatsService
  ) {}

  async getAllActiveQuestsForUser(uid: string): Promise<Quest[]> {
    const quests = await this.questRepository.createQueryBuilder('quest')
    .leftJoinAndSelect('quest.reclaim', 'reclaim')
    .leftJoinAndSelect('quest.survey', 'survey')
    .leftJoinAndSelect('survey.questions', 'question')
    .leftJoinAndSelect('question.options', 'option')
    .where('quest.enabled = true')
    .andWhere(qb => {
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

    const profile = await this.profileService.get(uid)
    const quest = await this.get(qid)

    await this.profileService.update(uid, {tokens: profile.tokens + quest.points})

    const status = await this.statusRepository.save({
      id: 0,
      profile: profile,
      quest: quest,
      status: "done",
      completedDate: new Date()
    })

    await this.transactionService.add(
      {
        id: 0,
        type: "quest",
        status: "confirmed",
        tokens: quest.points,
        blockchainTxId: "",
        receipt: null,
        questStatus: status,
        profile: profile,
        timestamp: new Date()
      }
    )

    await this.stats.addQuest(quest)

    return {gainedPoints: quest.points}
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
