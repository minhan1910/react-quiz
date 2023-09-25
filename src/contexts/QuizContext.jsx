/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import QuestionReducer, {
  initialQuestionState,
} from "../Reducers/Question/QuestionReducer";
import QuestionActions from "../Reducers/Question/QuestionActions";
import { useEffect } from "react";
import QuestionActionTypeEnum from "../Reducers/Question/QuestionTypeEnum";

const API_URL = `http://localhost:8000/questions`;

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(QuestionReducer.adapter(), initialQuestionState);

  const question = questions[index];
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((res, cur) => res + cur.points, 0);

  useEffect(function () {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("HTTP Error! status: " + res.status);
        }

        const data = await res.json();

        // dispatch({ type: actionTypeEnum.DATA_RECEIVED, payload: data });
        dispatch(QuestionActions.dataReceived(data));
      } catch (error) {
        console.log(error.message);

        dispatch({ type: QuestionActionTypeEnum.DATA_FAILED });
      }
    }

    fetchMovies();
  }, []);

  function handleStartQuestion() {
    dispatch({ type: QuestionActionTypeEnum.START });
  }

  function handleClickOption(indexOption) {
    dispatch({ type: QuestionActionTypeEnum.NEW_ANSWER, payload: indexOption });
  }

  function handleTimeLimit() {
    dispatch({ type: QuestionActionTypeEnum.TICK });
  }

  function handleFinished() {
    dispatch({ type: QuestionActionTypeEnum.FINISHED });
  }

  function handleNextQuestion() {
    dispatch({ type: QuestionActionTypeEnum.NEXT_QUESTION });
  }

  function handleResetQuiz() {
    dispatch({ type: QuestionActionTypeEnum.RESET });
  }
  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numQuestions,
        maxPossiblePoints,
        handleStartQuestion,
        handleClickOption,
        handleTimeLimit,
        handleFinished,
        handleNextQuestion,
        handleResetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("QuizContext was used outside of QuizProdider");
  }

  return context;
}

export { QuizProvider, useQuiz };
