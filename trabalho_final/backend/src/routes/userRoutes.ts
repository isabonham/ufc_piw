import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { authenticateToken } from "../middleware/AuthMiddleware";

const router = Router();

// API post (cadastrar usuário)
router.post('/users', async (req, res) => {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {
        return res.status(400).json({
            error: {
                status: 400,
                name: 'Validation error',
                message: 'Você não preencheu um campo obrigatório'
            }
        });
    }

    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    let roleInDB = await roleRepository.findOne({ where: { name: role } });

    if (!roleInDB) {
        roleInDB = roleRepository.create({ name: role });
        await roleRepository.save(roleInDB);
    }

    const newUser = userRepository.create({
        name,
        username,
        email,
        password,
        role: roleInDB
    });

    await userRepository.save(newUser);
    res.status(201).json({ data: newUser });
});

// API get (listar usuários)
router.get('/users', authenticateToken, async (req, res) => {
    const currentUser = (req as any).user;
    if (!currentUser || currentUser.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Somente administradores podem listar usuários.' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ relations: ['role'] });
    res.json({ data: users });
});

// API get (listar usuário pelo ID)
router.get('/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: parseInt(id) }, relations: ['role'] });

    if (!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Usuário não encontrado'
            }
        });
    }

    res.json({ data: user });
});

// API delete (deletar usuário)
router.delete('/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const currentUser = (req as any).user;

    if (!currentUser || currentUser.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Somente administradores podem deletar usuários.' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: parseInt(id) } });

    if (!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Usuário não encontrado'
            }
        });
    }

    await userRepository.remove(user);
    res.status(204).json(); // No Content
});

// API update user
router.put('/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password, role } = req.body;
    const currentUser = (req as any).user;

    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await userRepository.findOne({ where: { id: parseInt(id) } });

    if (!userToUpdate) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'Usuário não encontrado'
            }
        });
    }

    // Permitir atualização apenas se for o próprio usuário ou um administrador
    if (currentUser.id !== userToUpdate.id && currentUser.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Você só pode atualizar seu próprio cadastro.' });
    }

    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.username = username || userToUpdate.username;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.password = password || userToUpdate.password;
    userToUpdate.role = role || userToUpdate.role; 

    await userRepository.save(userToUpdate);
    res.status(200).json({ data: userToUpdate });
});

export default router;