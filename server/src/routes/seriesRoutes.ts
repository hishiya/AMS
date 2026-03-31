import { Router } from 'express';
import { getAllSeries, deleteSeries, updateSeries } from '../controllers/seriesController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', getAllSeries);
router.delete('/:id', deleteSeries);
router.put('/:id', upload.single('poster'), updateSeries);

export default router;
