import Options from "./Options";

function Question({ question, selectAnswer, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} selectAnswer={selectAnswer} answer={answer} />
    </div>
  );
}

export default Question;
