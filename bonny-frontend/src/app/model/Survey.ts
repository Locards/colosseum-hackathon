export interface Survey {
    id: number,
    title: string,
    description: string,
    points: number,
    questions: Question[]
}

export interface Question {
    id: number,
    title: string,
    type: "text" | "option",
    order: number,
    options?: QuestionOption[]
}

export interface QuestionOption {
    id: number,
    title: string,
    order: number
}

export interface SurveyAnswer {
    questId?: number,
    surveyId: number,
    answers: SurveyOptionAnswer[]
}

export interface SurveyOptionAnswer {
    questionId: number,
    optionId?: number,
    freeText?: string
}