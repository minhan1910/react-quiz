/* eslint-disable react/no-unescaped-entities */

import { useQuiz } from "../contexts/QuizContext";

/* eslint-disable react/prop-types */
function StartScreen() {
  const { numQuestions, handleStartQuestion } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} Question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuestion}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
