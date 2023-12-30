import { useEffect } from "react";

function Timer({ startTimer, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timerID = setInterval(() => {
      startTimer();
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [startTimer]);
  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
