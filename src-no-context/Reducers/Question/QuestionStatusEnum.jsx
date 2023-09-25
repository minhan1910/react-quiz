import Enum from "../../utils/Enum";

const QuestionStatusEnum = Enum({
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
  ACTIVE: "active",
  FINISHED: "finished",
});

export default QuestionStatusEnum;
