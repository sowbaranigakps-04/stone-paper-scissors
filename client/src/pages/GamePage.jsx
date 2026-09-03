import { useState } from 'react';
import PlayerNames from '../components/PlayerNames';
import ChoiceButtons from '../components/ChoiceButtons';
import HandoffScreen from '../components/HandoffScreen';
import RoundResult from '../components/RoundResult';
import FinalResult from '../components/FinalResult';
import { resolveRound } from '../utils/gameLogic';
import { saveGame } from '../api/gamesApi';

const TOTAL_ROUNDS = 6;

export default function GamePage() {
  const [phase, setPhase] = useState('names');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [score, setScore] = useState({ p1: 0, p2: 0, ties: 0 });
  const [roundsHistory, setRoundsHistory] = useState([]);
  const [saveStatus, setSaveStatus] = useState('idle');

  function handleNamesSubmit(name1, name2) {
    setPlayer1Name(name1);
    setPlayer2Name(name2);
    setPhase('p1_turn');
  }

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
    setRoundsHistory((prev) => [
      ...prev,
      { roundNumber: round, p1Choice, p2Choice: choice, result },
    ]);
    setPhase('reveal');
  }

  async function handleNextRound() {
    if (round >= TOTAL_ROUNDS) {
      await finishGame();
      return;
    }
    setRound((r) => r + 1);
    setP1Choice(null);
    setP2Choice(null);
    setLastResult(null);
    setPhase('p1_turn');
  }

  async function finishGame() {
    setPhase('game_over');
    setSaveStatus('saving');

    const finalScore = score;
    const winner =
      finalScore.p1 > finalScore.p2
        ? 'p1'
        : finalScore.p2 > finalScore.p1
        ? 'p2'
        : 'tie';

    try {
      await saveGame({
        player1Name,
        player2Name,
        rounds: roundsHistory,
        finalScore,
        winner,
      });
      setSaveStatus('saved');
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  }

  function handleRestart() {
    setPhase('names');
    setPlayer1Name('');
    setPlayer2Name('');
    setRound(1);
    setP1Choice(null);
    setP2Choice(null);
    setLastResult(null);
    setScore({ p1: 0, p2: 0, ties: 0 });
    setRoundsHistory([]);
    setSaveStatus('idle');
  }

  return (
    <div className="app">
      <h1>Stone Paper Scissors</h1>

      {phase === 'names' && <PlayerNames onSubmit={handleNamesSubmit} />}

      {phase === 'p1_turn' && (
        <ChoiceButtons playerLabel={player1Name} onSelect={handleP1Select} />
      )}

      {phase === 'handoff' && (
        <HandoffScreen
          nextPlayerLabel={player2Name}
          onContinue={handleHandoffContinue}
        />
      )}

      {phase === 'p2_turn' && (
        <ChoiceButtons playerLabel={player2Name} onSelect={handleP2Select} />
      )}

      {phase === 'reveal' && (
        <RoundResult
          roundNumber={round}
          totalRounds={TOTAL_ROUNDS}
          player1Name={player1Name}
          player2Name={player2Name}
          p1Choice={p1Choice}
          p2Choice={p2Choice}
          result={lastResult}
          score={score}
          isLastRound={round >= TOTAL_ROUNDS}
          onNext={handleNextRound}
        />
      )}

      {phase === 'game_over' && (
        <FinalResult
          player1Name={player1Name}
          player2Name={player2Name}
          score={score}
          saveStatus={saveStatus}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}