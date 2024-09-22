import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/AuthRoutes';
import cdRoutes from './routes/cdRoutes';
import orderRoutes from './routes/orderRoutes';
import { AppDataSource } from './DataSource';
import cors from 'cors';

async function startServer() {
    try {
        await AppDataSource.initialize();

        const app = express();
        const port = 3000;

        app.use(cors());
        app.use(express.json());
        app.use('/auth', authRoutes);
        app.use('/', userRoutes);
        app.use('/cds', cdRoutes);
        app.use('/orders', orderRoutes);

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (e) {
        throw e;
    }
}

startServer();
