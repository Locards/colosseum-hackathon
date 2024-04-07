import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { Answer, Question, QuestionOption, Survey } from './survey.entity';
import { SurveyService } from './survey.service';

@Module({
  controllers: [],
  providers: [SurveyService],
  imports: [
    TypeOrmModule.forFeature([Survey, Question, QuestionOption, Answer]),
    ProfileModule
  ],
  exports: [SurveyService]
})
export class SurveyModule {}
