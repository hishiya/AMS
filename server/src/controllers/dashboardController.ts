import { Request, Response } from 'express';
import pool from '../db';

export const addFilm = async (req: Request, res: Response) => {
    const { title, description, release_date, rating } = req.body;

    const posterUrl = req.file ? `/uploads/${req.file.filename}` : null; // Створюємо URL для збереження в базі даних
    if (!title || !description || !release_date || !rating) {
        return res.status(400).json({ message: 'Будь ласка, заповніть усі поля.' });
    }

    try {
        const newFilm = await pool.query(
            "INSERT INTO films (title, description, release_date, rating, poster_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, release_date, rating, posterUrl]
        );

        res.status(201).json(newFilm.rows[0]);
    } catch (error) {
        console.error('Помилка при додаванні фільму:', error);
        res.status(500).json({ message: 'Помилка сервера при додаванні фільму.' });
    }
};

export const addSeries = async (req: Request, res: Response) => {
    const { title, description, release_date, rating } = req.body;
    const posterUrl = req.file ? `/uploads/${req.file.filename}` : null; // Створюємо URL для збереження в базі даних


    if (!title || !description || !release_date || !rating) {
        return res.status(400).json({ message: 'Будь ласка, заповніть усі поля.' });
    }

    try {
        const newSeries = await pool.query(
            "INSERT INTO series (title, description, release_date, rating, poster_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, release_date, rating, posterUrl]
        );
        res.status(201).json(newSeries.rows[0]);
    } catch (error) {
        console.error('Помилка при додаванні серіалу:', error);
        res.status(500).json({ message: 'Помилка сервера при додаванні серіалу.' });
    }
};

export const addAnime = async (req: Request, res: Response) => {
    const { title, description, release_date, rating } = req.body;
    const posterUrl = req.file ? `/uploads/${req.file.filename}` : null; // Створюємо URL для збереження в базі даних

    if (!title || !description || !release_date || !rating) {
        return res.status(400).json({ message: 'Будь ласка, заповніть усі поля.' });
    }

    try {
        const newAnime = await pool.query(
            "INSERT INTO anime (title, description, release_date, rating, poster_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, release_date, rating, posterUrl]
        );
        res.status(201).json(newAnime.rows[0]);
    } catch (error) {
        console.error('Помилка при додаванні аніме:', error);
        res.status(500).json({ message: 'Помилка сервера при додаванні аніме.' });
    }
};
