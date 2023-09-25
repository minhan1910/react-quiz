/* eslint-disable react/prop-types */

import QuestionActionTypeEnum from "../Reducers/Question/QuestionTypeEnum";

function FinishScreen({
  index,
  numQuestions,
  points,
  highscore,
  maxPossiblePoints,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;

  if (index > numQuestions - 1) {
    return null;
  }

  function handleReset() {
    dispatch({ type: QuestionActionTypeEnum.RESET });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <div style={{ textAlign: "center" }}>
        <button
          className="btn"
          style={{ display: "inline-block" }}
          onClick={handleReset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
