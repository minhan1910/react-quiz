/* eslint-disable no-prototype-builtins */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-undef */
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Screens/StartScreen";
import Question from "./Components/Question";
import QuestionStatusEnum from "./Reducers/Question/QuestionStatusEnum";
import NextQuestion from "./Components/NextQuestion";
import Progress from "./Components/Progress";
import FinishScreen from "./Screens/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === QuestionStatusEnum.LOADING && <Loader />}
        {status === QuestionStatusEnum.ERROR && <Error />}
        {status === QuestionStatusEnum.READY && <StartScreen />}
        {status === QuestionStatusEnum.ACTIVE && (
          <>
            <Progress />

            <Question />

            <Footer>
              <Timer />

              <NextQuestion />
            </Footer>
          </>
        )}

        {status === QuestionStatusEnum.FINISHED && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
