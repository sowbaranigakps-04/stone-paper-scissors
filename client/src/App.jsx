import { useState } from 'react';
import ChoiceButtons from './components/ChoiceButtons';
import HandoffScreen from './components/HandoffScreen';
import RoundResult from './components/RoundResult';
import FinalResult from './components/FinalResult';
import { resolveRound } from './utils/gameLogic';
import './App.css';

const TOTAL_ROUNDS = 6;

// phase values: 'p1_turn' | 'handoff' | 'p2_turn' | 'reveal' | 'game_over'

function App() {
  const [phase, setPhase] = useState('p1_turn');
  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [score, setScore] = useState({ p1: 0, p2: 0, ties: 0 });

  function handleP1Select(choice) {
    setP1Choice(choice);
    setPhase('handoff');
  }

  function handleHandoffContinue() {
    setPhase('p2_turn');
  }

  function handleP2Select(choice) {
    setP2Choice(choice);
    const result = resolveRound(p1Choice, choice);
    setLastResult(result);
    setScore((prev) => {
      if (result === 'tie') return { ...prev, ties: prev.ties + 1 };
      return { ...prev, [result]: prev[result] + 1 };
    });
    setPhase('reveal');
  }

  function handleNextRound() {
    if (round >= TOTAL_ROUNDS) {
      setPhase('game_over');
      return;
    }
    setRound((r) => r + 1);
    setP1Choice(null);
    setP2Choice(null);
    setLastResult(null);
    setPhase('p1_turn');
  }

  function handleRestart() {
    setPhase('p1_turn');
    setRound(1);
    setP1Choice(null);
    setP2Choice(null);
    setLastResult(null);
    setScore({ p1: 0, p2: 0, ties: 0 });
  }

  return (
    <div className="app">
      <h1>Stone Paper Scissors</h1>

      {phase === 'p1_turn' && (
        <ChoiceButtons playerLabel="Player 1" onSelect={handleP1Select} />
      )}

      {phase === 'handoff' && (
        <HandoffScreen
          nextPlayerLabel="Player 2"
          onContinue={handleHandoffContinue}
        />
      )}

      {phase === 'p2_turn' && (
        <ChoiceButtons playerLabel="Player 2" onSelect={handleP2Select} />
      )}

      {phase === 'reveal' && (
        <RoundResult
          roundNumber={round}
          totalRounds={TOTAL_ROUNDS}
          p1Choice={p1Choice}
          p2Choice={p2Choice}
          result={lastResult}
          score={score}
          isLastRound={round >= TOTAL_ROUNDS}
          onNext={handleNextRound}
        />
      )}

      {phase === 'game_over' && (
        <FinalResult score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
