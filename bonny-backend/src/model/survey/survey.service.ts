import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer, Question, QuestionOption, Survey } from './survey.entity';
import { SurveyAnswer } from 'src/controller/marketplace/marketplace.controller';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private profileService: ProfileService
  ) {}

  async getAll(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async add(survey: Survey): Promise<Survey> {
    const newSurvey = await this.surveyRepository.create(survey);
    return await this.surveyRepository.save(newSurvey);
  }

  async get(id: number): Promise<Survey> {
    return await this.surveyRepository.findOneBy({ id: id });
  }

  async update(id: number, profile: Partial<Survey>): Promise<Survey> {
    await this.surveyRepository.update(id, profile);
    return await this.surveyRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.surveyRepository.findOneByOrFail({ id: id });
    return await this.surveyRepository.delete(id);
  }

  async submitAnswer(uid: string, answer: SurveyAnswer) {

    const profile = await this.profileService.get(uid)

    for(let a of answer.answers) {
      const question = await this.questionRepository.findOneBy({id: a.questionId})

      if(question.type == "text") {
        await this.answerRepository.save({
          id: 0,
          profile: profile,
          question: question,
          freeText: a.freeText
        })
      } else {
        const option = await this.questionOptionRepository.findOneBy({id: a.optionId})
        await this.answerRepository.save({
          id: 0,
          profile: profile,
          question: question,
          selectedOption: option
        })
      }
    }


  }

}
