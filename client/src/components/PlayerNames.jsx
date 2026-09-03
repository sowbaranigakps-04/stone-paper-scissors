import { useState } from 'react';

export default function PlayerNames({ onSubmit }) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const name1 = player1Name.trim();
    const name2 = player2Name.trim();

    if (!name1 || !name2) {
      setError('Both names are required');
      return;
    }

    setError('');
    onSubmit(name1, name2);
  }

  return (
    <form className="player-names" onSubmit={handleSubmit}>
      <h2>Who's Playing?</h2>

      <label htmlFor="p1name">Player 1</label>
      <input
        id="p1name"
        type="text"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        placeholder="Enter Player 1's name"
      />

      <label htmlFor="p2name">Player 2</label>
      <input
        id="p2name"
        type="text"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        placeholder="Enter Player 2's name"
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="continue-btn">
        Let's Play
      </button>
    </form>
  );
}