import { Router } from 'express';
import { createGame, getGames, getGameById } from '../controllers/gameController.js';

const router = Router();

router.post('/', createGame);
router.get('/', getGames);
router.get('/:id', getGameById);

export default router;