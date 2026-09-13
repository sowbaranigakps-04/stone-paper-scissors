import { createGame, getAllGames, getGameById } from '../model/Game.js';

export async function postGame(req, res) {
  try {
    const { player1Name, player2Name, rounds, finalScore, winner } = req.body;

    if (!player1Name || !player2Name || !rounds || !finalScore || !winner) {
      return res.status(400).json({ error: 'Missing required game fields' });
    }

    const game = await createGame({ player1Name, player2Name, rounds, finalScore, winner });
    res.status(201).json(game);
  } catch (err) {
    console.error('Error saving game:', err);
    res.status(500).json({ error: 'Failed to save game' });
  }
}

export async function getGames(req, res) {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
}

export async function getGame(req, res) {
  try {
    const game = await getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    console.error('Error fetching game:', err);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
}