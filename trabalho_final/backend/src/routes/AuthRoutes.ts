import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { username }, relations: ['role'] });
    if (!user || password !== user.password) { 
        return res.status(400).json({ message: 'Usuário não encontrado ou senha inválida' });
    }

    const token = jwt.sign({ id: user.id, role: user.role.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token });
});

export default router;