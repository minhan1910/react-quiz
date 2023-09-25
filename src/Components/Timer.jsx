/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function formatNum(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function Timer() {
  const { secondRemaining, handleTimeLimit } = useQuiz();
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

  useEffect(function () {
    // with performance problem but this is learning so ignore it
    const id = setInterval(function () {
      handleTimeLimit();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [handleTimeLimit]);

  return (
    <div className="timer">
      {formatNum(mins)}:{formatNum(seconds)}
    </div>
  );
}

export default Timer;
