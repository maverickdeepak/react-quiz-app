import React from "react";

function FinishScreen({ points, maximumPossiblePoints, restartQuiz }) {
  const percentage = (points / maximumPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 35 && percentage < 50) emoji = "🏅";
  if (percentage >= 0 && percentage < 35) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Score <strong>{points}</strong> out of{" "}
        {maximumPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <button className="btn btn-ui" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
