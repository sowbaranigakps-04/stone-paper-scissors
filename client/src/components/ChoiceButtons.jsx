import { CHOICES } from '../utils/gameLogic';

const ICONS = {
  stone: '\u270A',
  paper: '\u270B',
  scissors: '\u270C\uFE0F',
};

export default function ChoiceButtons({ playerLabel, onSelect }) {
  return (
    <div className="choice-screen">
      <h2>{playerLabel}'s turn</h2>
      <p className="hint">Pick stone, paper, or scissors</p>
      <div className="choice-buttons">
        {CHOICES.map((choice) => (
          <button
            key={choice}
            className="choice-btn"
            onClick={() => onSelect(choice)}
          >
            <span className="choice-icon">{ICONS[choice]}</span>
            <span className="choice-label">{choice}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
