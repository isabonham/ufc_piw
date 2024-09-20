import express from 'express'
import userRoutes from './routes/userRoutes'
import { AppDataSource } from './DataSource'
import authRoutes from './routes/AuthRoutes';

async function startServer() {
    try {
        await AppDataSource.initialize()
        
        const app = express ()
        const port = 3000
    
        //app.get('/', (req, res) => {
        //res.send('<html> <center> <h1> Loja de CDs <h1> <h3>Este projeto é uma loja destinada a venda de CDs de artistas de vários ritmos e estilos musicais.<h3> <h2> Dupla: Isabela e Bianca <h2></center></html>');
        //});
    
        app.use(express.json())
        app.use('/auth', authRoutes);
        app.use('/', userRoutes)
    
        app.listen(port, () => {
            console.log(`Servidor executando na port ${port} em http://localhost:${port}`)
        }) 
    } catch (e) {
        throw e
    }
    
}

startServer()