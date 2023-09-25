/* eslint-disable react/prop-types */
import { useEffect } from "react";
import QuestionActionTypeEnum from "../Reducers/Question/QuestionTypeEnum";

function formatNum(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function Timer({ dispatch, secondRemaining }) {
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

  useEffect(
    function () {
      // with performance problem but this is learning so ignore it
      const id = setInterval(function () {
        dispatch({ type: QuestionActionTypeEnum.TICK });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {formatNum(mins)}:{formatNum(seconds)}
    </div>
  );
}

export default Timer;
