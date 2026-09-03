import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema(
  {
    roundNumber: { type: Number, required: true },
    p1Choice: {
      type: String,
      required: true,
      enum: ['stone', 'paper', 'scissors'],
    },
    p2Choice: {
      type: String,
      required: true,
      enum: ['stone', 'paper', 'scissors'],
    },
    result: {
      type: String,
      required: true,
      enum: ['p1', 'p2', 'tie'],
    },
  },
  { _id: false }
);

const gameSchema = new mongoose.Schema(
  {
    player1Name: { type: String, required: true, trim: true },
    player2Name: { type: String, required: true, trim: true },
    rounds: {
      type: [roundSchema],
      validate: {
        validator: (arr) => arr.length === 6,
        message: 'A game must have exactly 6 rounds',
      },
    },
    finalScore: {
      p1: { type: Number, required: true },
      p2: { type: Number, required: true },
      ties: { type: Number, required: true },
    },
    winner: {
      type: String,
      required: true,
      enum: ['p1', 'p2', 'tie'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Game', gameSchema);