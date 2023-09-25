/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import QuestionActionTypeEnum from "../Reducers/Question/QuestionTypeEnum";

function NextQuestion({ index, numQuestions, dispatch, answer }) {
  if (answer === null) return null;

  const isFinished = index >= numQuestions - 1;

  function handleClickNextButton() {
    if (isFinished) {
      dispatch({ type: QuestionActionTypeEnum.FINISHED });
    } else {
      dispatch({ type: QuestionActionTypeEnum.NEXT_QUESTION });
    }
  }

  return (
    <button className="btn btn-ui" onClick={handleClickNextButton}>
      {isFinished ? "Finish" : "Next"}
    </button>
  );
}

export default NextQuestion;
