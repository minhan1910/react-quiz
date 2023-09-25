/* eslint-disable react/no-unescaped-entities */

import actionTypeEnum from "../Reducers/Question/QuestionTypeEnum";

/* eslint-disable react/prop-types */
function StartScreen({ numQuestions, dispatch }) {
  function handleStartQuiz() {
    dispatch({ type: actionTypeEnum.START });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} Question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
