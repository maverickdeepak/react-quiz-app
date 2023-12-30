import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTIONS = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "DATARECIEVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "DATAFAILED":
      return {
        ...state,
        status: "error",
      };
    case "LETSSTART":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTIONS,
      };
    case "NEWANSWER":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXTQUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "FINISH":
      return {
        ...state,
        status: "finish",
      };
    case "RESTARTQUIZ":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      break;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, secondsRemaining } = state;

  const numberOfQuestions = questions.length;
  const maximumPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  const letsStartQuiz = () => {
    dispatch({ type: "LETSSTART" });
  };

  const selectAnswer = (selectedOption) => {
    dispatch({ type: "NEWANSWER", payload: selectedOption });
  };

  const nextQuestion = () => {
    dispatch({ type: "NEXTQUESTION" });
  };

  const finishQuiz = () => {
    dispatch({ type: "FINISH" });
  };

  const restartQuiz = () => {
    dispatch({ type: "RESTARTQUIZ" });
  };

  const startTimer = () => {
    dispatch({ type: "TICK" });
  };

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DATARECIEVED", payload: data }))
      .catch((error) => dispatch({ type: "DATAFAILED" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            letsStartQuiz={letsStartQuiz}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maximumPossiblePoints={maximumPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              selectAnswer={selectAnswer}
              answer={answer}
            />
            <footer>
              <NextButton
                nextQuestion={nextQuestion}
                answer={answer}
                index={index}
                numberOfQuestions={numberOfQuestions}
                finishQuiz={finishQuiz}
              />
              <Timer
                startTimer={startTimer}
                secondsRemaining={secondsRemaining}
              />
            </footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maximumPossiblePoints={maximumPossiblePoints}
            restartQuiz={restartQuiz}
          />
        )}
      </Main>
    </div>
  );
}
