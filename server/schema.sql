CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  player1_name VARCHAR(100) NOT NULL,
  player2_name VARCHAR(100) NOT NULL,
  score_p1 INTEGER NOT NULL,
  score_p2 INTEGER NOT NULL,
  score_ties INTEGER NOT NULL,
  winner VARCHAR(10) NOT NULL CHECK (winner IN ('p1', 'p2', 'tie')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rounds (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  p1_choice VARCHAR(10) NOT NULL CHECK (p1_choice IN ('stone', 'paper', 'scissors')),
  p2_choice VARCHAR(10) NOT NULL CHECK (p2_choice IN ('stone', 'paper', 'scissors')),
  result VARCHAR(10) NOT NULL CHECK (result IN ('p1', 'p2', 'tie'))
);