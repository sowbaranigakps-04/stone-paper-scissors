export default function FinalResult({ score, onRestart }) {
  let winnerText;
  if (score.p1 > score.p2) {
    winnerText = 'Player 1 wins the game!';
  } else if (score.p2 > score.p1) {
    winnerText = 'Player 2 wins the game!';
  } else {
    winnerText = "It's an overall tie!";
  }

  return (
    <div className="final-result">
      <h2>Game over</h2>
      <p className="final-winner">{winnerText}</p>

      <div className="score-board">
        <span>Player 1: {score.p1}</span>
        <span>Player 2: {score.p2}</span>
        <span>Ties: {score.ties}</span>
      </div>

      <button className="continue-btn" onClick={onRestart}>
        Play again
      </button>
    </div>
  );
}
