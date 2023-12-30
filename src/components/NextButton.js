function NextButton({ nextQuestion, answer, index, numberOfQuestions, finishQuiz }) {
  if (answer === null) return null;
  if (index < numberOfQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );

  if (index === numberOfQuestions - 1)
      return (
        <button className="btn btn-ui" onClick={finishQuiz}>
          Finish
        </button>
      );
}

export default NextButton;
