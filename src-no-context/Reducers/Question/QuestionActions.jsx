import QuestionActionTypeEnum from "./QuestionTypeEnum";

/* eslint-disable no-unused-vars */
class QuestionActions {
  dataReceived = (payload) => ({
    type: QuestionActionTypeEnum.DATA_RECEIVED,
    payload,
  });
}

export default new QuestionActions();
