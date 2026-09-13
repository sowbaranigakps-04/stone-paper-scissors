import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames } from '../api/gamesApi';

export default function HistoryPage() {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchGames()
      .then((data) => {
        setGames(data);
        setStatus('loaded');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  }, []);

  return (
    <div className="app history-page">
      <Link to="/" className="back-arrow" aria-label="Back to game">
        &larr;
      </Link>
      <h1>Game History</h1>

      <div className="history-scroll-area">
        {status === 'loading' && <p className="hint">Loading history...</p>}
        {status === 'error' && (
          <p className="form-error">Could not load game history.</p>
        )}
        {status === 'loaded' && games.length === 0 && (
          <p className="hint">No games played yet.</p>
        )}

        <div className="history-list">
          {games.map((game) => (
            <div className="history-item" key={game.id}>
              <p className="history-names">
                {game.player1_name} vs {game.player2_name}
              </p>
              <p className="history-score">
                Rounds won - {game.player1_name}: {game.score_p1}, {game.player2_name}: {game.score_p2}, Tied: {game.score_ties}
              </p>
              <p className="history-winner">
                Winner:{' '}
                {game.winner === 'tie'
                  ? 'Tie'
                  : game.winner === 'p1'
                  ? game.player1_name
                  : game.player2_name}
              </p>
              <p className="history-date">
                {new Date(game.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}