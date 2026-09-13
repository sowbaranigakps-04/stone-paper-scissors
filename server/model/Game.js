import { pool } from '../config/db.js';

export async function createGame({ player1Name, player2Name, rounds, finalScore, winner }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const gameResult = await client.query(
      `INSERT INTO games (player1_name, player2_name, score_p1, score_p2, score_ties, winner)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [player1Name, player2Name, finalScore.p1, finalScore.p2, finalScore.ties, winner]
    );
    const game = gameResult.rows[0];

    for (const round of rounds) {
      await client.query(
        `INSERT INTO rounds (game_id, round_number, p1_choice, p2_choice, result)
         VALUES ($1, $2, $3, $4, $5)`,
        [game.id, round.roundNumber, round.p1Choice, round.p2Choice, round.result]
      );
    }

    await client.query('COMMIT');
    return game;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getAllGames() {
  const result = await pool.query(
    `SELECT * FROM games ORDER BY created_at DESC`
  );
  return result.rows;
}

export async function getGameById(id) {
  const gameResult = await pool.query(`SELECT * FROM games WHERE id = $1`, [id]);
  if (gameResult.rows.length === 0) return null;

  const roundsResult = await pool.query(
    `SELECT * FROM rounds WHERE game_id = $1 ORDER BY round_number ASC`,
    [id]
  );

  return { ...gameResult.rows[0], rounds: roundsResult.rows };
}