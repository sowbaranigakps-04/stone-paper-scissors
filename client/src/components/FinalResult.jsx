export default function FinalResult({
  player1Name,
  player2Name,
  score,
  saveStatus,
  onRestart,
}) {
  let winnerText;
  if (score.p1 > score.p2) {
    winnerText = `${player1Name} wins the game!`;
  } else if (score.p2 > score.p1) {
    winnerText = `${player2Name} wins the game!`;
  } else {
    winnerText = "It's an overall tie!";
  }

  return (
    <div className="final-result">
      <h2>Game over</h2>
      <p className="final-winner">{winnerText}</p>

      <div className="score-board">
        <span>{player1Name}: {score.p1}</span>
        <span>{player2Name}: {score.p2}</span>
        <span>Ties: {score.ties}</span>
      </div>

      {saveStatus === 'saving' && <p className="hint">Recording your result...</p>}
      {saveStatus === 'saved' && <p className="hint">Added to history.</p>}
      {saveStatus === 'error' && (
        <p className="form-error">
          Could not save game. Check that the backend is running.
        </p>
      )}

      <div className="final-actions">
        <button className="continue-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}