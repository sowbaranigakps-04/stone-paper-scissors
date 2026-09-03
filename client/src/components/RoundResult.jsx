const ICONS = {
  stone: '\u270A',
  paper: '\u270B',
  scissors: '\u270C\uFE0F',
};

export default function RoundResult({
  roundNumber,
  totalRounds,
  player1Name,
  player2Name,
  p1Choice,
  p2Choice,
  result,
  score,
  isLastRound,
  onNext,
}) {
  const resultText = {
    p1: `${player1Name} wins this round!`,
    p2: `${player2Name} wins this round!`,
    tie: "It's a tie!",
  }[result];

  return (
    <div className="round-result">
      <h2>Round {roundNumber} of {totalRounds}</h2>

      <div className="reveal-row">
        <div className="reveal-side">
          <p className="reveal-label">{player1Name}</p>
          <span className="reveal-icon">{ICONS[p1Choice]}</span>
          <p className="reveal-choice">{p1Choice}</p>
        </div>
        <span className="vs">vs</span>
        <div className="reveal-side">
          <p className="reveal-label">{player2Name}</p>
          <span className="reveal-icon">{ICONS[p2Choice]}</span>
          <p className="reveal-choice">{p2Choice}</p>
        </div>
      </div>

      <p className="round-outcome">{resultText}</p>

      <div className="score-board">
        <span>{player1Name}: {score.p1}</span>
        <span>{player2Name}: {score.p2}</span>
        <span>Ties: {score.ties}</span>
      </div>

      <button className="continue-btn" onClick={onNext}>
        {isLastRound ? 'See final result' : 'Next round'}
      </button>
    </div>
  );
}