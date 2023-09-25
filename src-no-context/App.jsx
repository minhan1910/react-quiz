/* eslint-disable no-prototype-builtins */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-undef */
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./Screens/StartScreen";
import Question from "./Components/Question";
import QuestionStatusEnum from "./Reducers/Question/QuestionStatusEnum";
import actionTypeEnum from "./Reducers/Question/QuestionTypeEnum";
import QuestionReducer, {
  initialQuestionState,
} from "./Reducers/Question/QuestionReducer";
import NextQuestion from "./Components/NextQuestion";
import Progress from "./Components/Progress";
import FinishScreen from "./Screens/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";
import QuestionActions from "./Reducers/Question/QuestionActions";

const API_URL = `http://localhost:8000/questions`;

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(QuestionReducer.adapter(), initialQuestionState);

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

        dispatch({ type: actionTypeEnum.DATA_FAILED });
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === QuestionStatusEnum.LOADING && <Loader />}
        {status === QuestionStatusEnum.ERROR && <Error />}
        {status === QuestionStatusEnum.READY && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === QuestionStatusEnum.ACTIVE && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />

              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === QuestionStatusEnum.FINISHED && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            index={index}
            numQuestions={numQuestions}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
