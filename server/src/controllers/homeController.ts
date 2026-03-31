import { Request, Response } from 'express';
import db from '../db';

export const getHomeContent = async (_req: Request, res: Response) => {
    try {
        const [animeResult, filmsResult, seriesResult] = await Promise.all([
            db.query('SELECT * FROM anime ORDER BY rating DESC'),
            db.query('SELECT * FROM films ORDER BY rating DESC'),
            db.query('SELECT * FROM series ORDER BY rating DESC'),
        ]);

        res.json({
            anime: animeResult.rows,
            films: filmsResult.rows,
            series: seriesResult.rows,
        });
    } catch (error) {
        console.error('Failed to fetch home content:', error);
        res.status(500).json({ message: 'Failed to fetch home content' });
    }
};
