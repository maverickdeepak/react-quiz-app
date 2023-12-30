function StartScreen({ numberOfQuestions, letsStartQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your mastery.</h3>
      <button className="btn btn-ui" onClick={letsStartQuiz}>Let's Start</button>
    </div>
  );
}

export default StartScreen;
