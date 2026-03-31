import express from 'express';
import cors from 'cors';
import path from 'path';

import db from './db';

import animeRoutes from './routes/animeRoutes';
import filmsRoutes from './routes/filmsRoutes';
import seriesRoutes from './routes/seriesRoutes';
import homeRoutes from './routes/homeRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads'))); 

app.use('/api/anime', animeRoutes);
app.use('/api/films', filmsRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/dashboard', dashboardRoutes);

const startServer = async () => {
    try {
        await db.query('SELECT NOW()');
        console.log('✅ PostgreSQL connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port https://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1);
    }
};

startServer();