import { Router } from 'express';
import { deleteFilm, getAllFilms, updateFilm } from '../controllers/filmsController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', getAllFilms);
router.delete('/:id', deleteFilm);
router.put('/:id', upload.single('poster'), updateFilm);

export default router;
