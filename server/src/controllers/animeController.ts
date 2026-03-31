import { Request, Response } from 'express';
import db from '../db';

export const getAllAnime = async (_req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM anime ORDER BY rating DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Failed to fetch anime:', error);
        res.status(500).json({ message: 'Failed to fetch anime' });
    }
};

export const deleteAnime = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM anime WHERE id = $1', [id]);
        res.json({ message: 'Anime deleted successfully' });
    } catch (error) {
        console.error('Failed to delete anime:', error);
        res.status(500).json({ message: 'Failed to delete anime' });
    }
};

export const updateAnime = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, release_date, rating } = req.body;
    
    const newPosterUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        let result;

        if (newPosterUrl) {
            result = await db.query(
                'UPDATE anime SET title = $1, description = $2, release_date = $3, rating = $4, poster_url = $5 WHERE id = $6 RETURNING *',
                [title, description, release_date, rating, newPosterUrl, id]
            );
        } else {
            result = await db.query(
                'UPDATE anime SET title = $1, description = $2, release_date = $3, rating = $4 WHERE id = $5 RETURNING *',
                [title, description, release_date, rating, id]
            );
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Anime not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update anime:', error);
        res.status(500).json({ message: 'Failed to update anime' });
    }
}