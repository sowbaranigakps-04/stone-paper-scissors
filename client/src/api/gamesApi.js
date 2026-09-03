const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function saveGame(gameData) {
  const res = await fetch(`${API_BASE}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  });

  if (!res.ok) {
    throw new Error('Failed to save game');
  }

  return res.json();
}

export async function fetchGames() {
  const res = await fetch(`${API_BASE}/games`);

  if (!res.ok) {
    throw new Error('Failed to fetch games');
  }

  return res.json();
}