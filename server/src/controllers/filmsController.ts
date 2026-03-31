import { Request, Response } from 'express';
import db from '../db';

export const getAllFilms = async (_req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM films ORDER BY rating DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Failed to fetch films:', error);
        res.status(500).json({ message: 'Failed to fetch films' });
    }
};

export const deleteFilm = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM films WHERE id = $1', [id]);
        res.json({ message: 'Film deleted successfully' });
    } catch (error) {
        console.error('Failed to delete film:', error);
        res.status(500).json({ message: 'Failed to delete film' });
    }
}

export const updateFilm = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, release_date, rating } = req.body;
    
    const newPosterUrl = req.file ? `/api/uploads/${req.file.filename}` : null;

    try {
        let result;

        if (newPosterUrl) {
            result = await db.query(
                'UPDATE films SET title = $1, description = $2, release_date = $3, rating = $4, poster_url = $5 WHERE id = $6 RETURNING *',
                [title, description, release_date, rating, newPosterUrl, id]
            );
        } else {
            result = await db.query(
                'UPDATE films SET title = $1, description = $2, release_date = $3, rating = $4 WHERE id = $5 RETURNING *',
                [title, description, release_date, rating, id]
            );
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Film not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update film:', error);
        res.status(500).json({ message: 'Failed to update film' });
    }
}
