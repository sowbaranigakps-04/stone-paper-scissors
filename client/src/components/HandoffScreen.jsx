export default function HandoffScreen({ nextPlayerLabel, onContinue }) {
  return (
    <div className="handoff-screen">
      <h2>Pass the device to {nextPlayerLabel}</h2>
      <p className="hint">Make sure the other player isn't looking!</p>
      <button className="continue-btn" onClick={onContinue}>
        I'm Ready
      </button>
    </div>
  );
}
