import Enum from "../../utils/Enum";

const QuestionActionTypeEnum = Enum({
  DATA_RECEIVED: "dataReceived",
  DATA_FAILED: "dataFailed",
  START: "start",
  NEW_ANSWER: "newAnswer",
  NEXT_QUESTION: "nextQuestion",
  FINISHED: "finished",
  RESET: "reset",
  TICK: "tick",
});

export default QuestionActionTypeEnum;
