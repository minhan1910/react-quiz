/* eslint-disable react-refresh/only-export-components */
import BaseReducer from "../BaseReducer";
import QuestionStatusEnum from "./QuestionStatusEnum";
import QuestionActionTypeEnum from "./QuestionTypeEnum";

export const initialQuestionState = {
  questions: [],
  // loading, error, ready, active, finished
  status: QuestionStatusEnum.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};

const SECC_PER_QUESTION = 30;

class QuestionReducer extends BaseReducer {
  constructor(state, action) {
    super(state, action);
  }

  /** @Override */
  initHandlerReducer() {
    return {
      [QuestionActionTypeEnum.DATA_RECEIVED]: () => this.handleDataReceived,
      [QuestionActionTypeEnum.DATA_FAILED]: () => this.handleDataFailed,
      [QuestionActionTypeEnum.START]: () => this.handleStartQuiz,
      [QuestionActionTypeEnum.NEW_ANSWER]: () => this.handleGetNewAnswer,
      [QuestionActionTypeEnum.NEXT_QUESTION]: () => this.handleNextQuestion,
      [QuestionActionTypeEnum.FINISHED]: () => this.handleFinishedQuiz,
      [QuestionActionTypeEnum.RESET]: () => this.handleReset,
      [QuestionActionTypeEnum.TICK]: () => this.handleTick,
    };
  } 

  handleDataReceived() {
    return {
      ...this.state,
      questions: this.action.payload,
      status: QuestionStatusEnum.READY,
    };
  }

  handleDataFailed() {
    return {
      ...this.state,
      status: QuestionStatusEnum.ERROR,
    };
  }

  handleStartQuiz() {
    return {
      ...this.state,
      status: QuestionStatusEnum.ACTIVE,
      secondRemaining: this.state.questions.length * SECC_PER_QUESTION,
    };
  }

  handleGetNewAnswer() {
    const newAnswerOption = this.action.payload;

    const currentQuestion = this.state.questions[this.state.index];

    const isCorrectOption = currentQuestion.correctOption === newAnswerOption;

    return {
      ...this.state,
      answer: this.action.payload,
      points: isCorrectOption
        ? this.state.points + currentQuestion.points
        : this.state.points,
    };
  }

  handleNextQuestion() {
    return {
      ...this.state,
      index: this.state.index + 1,
      answer: null,
    };
  }

  handleFinishedQuiz() {
    return {
      ...this.state,
      status: QuestionStatusEnum.FINISHED,
      highscore:
        this.state.points > this.state.highscore
          ? this.state.points
          : this.state.highscore,
    };
  }

  handleReset() {
    return {
      ...initialQuestionState,
      questions: this.state.questions,
      status: QuestionStatusEnum.READY,
    };
  }

  handleTick() {
    return {
      ...this.state,
      secondRemaining: this.state.secondRemaining - 1,
      status:
        this.state.secondRemaining === 0
          ? QuestionStatusEnum.FINISHED
          : this.state.status,
    };
  }
}

export default QuestionReducer;
