/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import QuestionActionTypeEnum from "../Reducers/Question/QuestionTypeEnum";
import { useQuiz } from "../contexts/QuizContext";

function NextQuestion() {
  const { index, numQuestions, handleFinished, handleNextQuestion, answer } =
    useQuiz();

  if (answer === null) return null;

  const isFinished = index >= numQuestions - 1;

  function handleClickNextButton() {
    if (isFinished) {
      handleFinished();
    } else {
      handleNextQuestion();
    }
  }

  return (
    <button className="btn btn-ui" onClick={handleClickNextButton}>
      {isFinished ? "Finish" : "Next"}
    </button>
  );
}

export default NextQuestion;
