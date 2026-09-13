import { Router } from 'express';
import { postGame, getGames, getGame } from '../controllers/gameController.js';

const router = Router();

router.post('/', postGame);
router.get('/', getGames);
router.get('/:id', getGame);

export default router;