export const CHOICES = ['stone', 'paper', 'scissors'];

// beats[a] === b means "a beats b"
const beats = {
  stone: 'scissors',
  scissors: 'paper',
  paper: 'stone',
};

/**
 * Resolves a single round.
 * @param {'stone'|'paper'|'scissors'} choice1 - Player 1's pick
 * @param {'stone'|'paper'|'scissors'} choice2 - Player 2's pick
 * @returns {'p1'|'p2'|'tie'}
 */
export function resolveRound(choice1, choice2) {
  if (choice1 === choice2) return 'tie';
  return beats[choice1] === choice2 ? 'p1' : 'p2';
}