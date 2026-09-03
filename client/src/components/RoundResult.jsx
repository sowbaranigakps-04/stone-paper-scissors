const ICONS = {
  stone: '\u270A',
  paper: '\u270B',
  scissors: '\u270C\uFE0F',
};

const RESULT_TEXT = {
  p1: 'Player 1 wins this round!',
  p2: 'Player 2 wins this round!',
  tie: "It's a tie!",
};

export default function RoundResult({
  roundNumber,
  totalRounds,
  p1Choice,
  p2Choice,
  result,
  score,
  isLastRound,
  onNext,
}) {
  return (
    <div className="round-result">
      <h2>
        Round {roundNumber} of {totalRounds}
      </h2>

      <div className="reveal-row">
        <div className="reveal-side">
          <p className="reveal-label">Player 1</p>
          <span className="reveal-icon">{ICONS[p1Choice]}</span>
          <p className="reveal-choice">{p1Choice}</p>
        </div>
        <span className="vs">vs</span>
        <div className="reveal-side">
          <p className="reveal-label">Player 2</p>
          <span className="reveal-icon">{ICONS[p2Choice]}</span>
          <p className="reveal-choice">{p2Choice}</p>
        </div>
      </div>

      <p className="round-outcome">{RESULT_TEXT[result]}</p>

      <div className="score-board">
        <span>Player 1: {score.p1}</span>
        <span>Player 2: {score.p2}</span>
        <span>Ties: {score.ties}</span>
      </div>

      <button className="continue-btn" onClick={onNext}>
        {isLastRound ? 'See final result' : 'Next round'}
      </button>
    </div>
  );
}
