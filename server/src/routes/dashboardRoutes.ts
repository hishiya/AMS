import { Router } from 'express';
import { addFilm, addSeries, addAnime } from '../controllers/dashboardController';
import upload from '../middleware/upload';

const router = Router();

router.post('/films', upload.single('poster'), addFilm);

router.post('/series', upload.single('poster'), addSeries);

router.post('/anime', upload.single('poster'), addAnime);

export default router;
