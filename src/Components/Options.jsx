/* eslint-disable react/prop-types */
import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { question, handleClickOption, answer } = useQuiz();

  const hasAnswered = answer !== null;

  function isCorrectAnswer(indexOption) {
    if (!hasAnswered) {
      return "";
    }
    return indexOption === answer ? "answer" : "";
  }

  function fillColorOptions(indexOption, correctOption) {
    if (hasAnswered) {
      return indexOption === correctOption ? "correct" : "wrong";
    }
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${isCorrectAnswer(
            index
          )} ${fillColorOptions(index, question.correctOption)}`}
          disabled={hasAnswered}
          onClick={() => handleClickOption(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
