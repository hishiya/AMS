import { Router } from 'express';
import { getAllAnime, deleteAnime, updateAnime } from '../controllers/animeController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', getAllAnime);
router.delete('/:id', deleteAnime);
router.put('/:id', upload.single('poster'), updateAnime);

export default router;