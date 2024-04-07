import { Component, Input, OnInit } from '@angular/core';
import { Question, Survey, SurveyAnswer, SurveyOptionAnswer } from 'src/app/model/Survey';
import * as _ from 'lodash'
import { ModalController } from '@ionic/angular';
import { MarketplaceService } from '../../marketplace.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent  implements OnInit {


  //@ts-ignore
  @Input("survey") survey: Survey = undefined
  //@ts-ignore
  @Input("questId") questId: number = undefined

  //@ts-ignore
  index: number = 0

  answers: SurveyOptionAnswer[] = [];
  //@ts-ignore
  currentAnswer: any;

  loading: boolean = false

  constructor(
    private modalCtrl: ModalController,
    private marketplaceService: MarketplaceService  
  ) { 
  }

  ngOnInit() {
    this.survey.questions = _.orderBy(this.survey.questions, (question: Question) => question.order)
    console.log(this.survey)

  }


  next() {
    this.answers[this.index] = {
      questionId: this.survey.questions[this.index].id,
      optionId: this.currentAnswer
    };
    this.currentAnswer = undefined;
    this.index++;
  }

  previous() {
    this.index--;
    this.currentAnswer = this.answers[this.index].optionId;
  }

  submitAnswers() {
    this.answers[this.index] = this.currentAnswer;
    console.log(this.answers)

    const answer: SurveyAnswer = {
      questId: this.questId,
      surveyId: this.survey.id,
      answers: this.answers
    }

    this.loading = true;

    this.marketplaceService.submitSurvey(answer).subscribe(() => {
      this.modalCtrl.dismiss()
    })
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

}
