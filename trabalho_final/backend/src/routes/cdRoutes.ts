import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { CD } from "../entity/CD";
import { authenticateToken } from "../middleware/AuthMiddleware";
import { isAdmin } from "../middleware/AdminMiddleware";

const router = Router();

// Criar CD 
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { title, artist, price, stock } = req.body;

    if (!title || !artist || typeof price !== 'number' || price <= 0 || typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }
    
    if (!title || !artist || !price || !stock) {
        return res.status(400).json({ message: 'Dados incompletos' });
    }

    const cdRepository = AppDataSource.getRepository(CD);
    const newCD = cdRepository.create({ title, artist, price, stock });

    await cdRepository.save(newCD);
    res.status(201).json({ data: newCD });
});

// Listar CDs 
router.get('/', authenticateToken ,async (req, res) => {
    const cdRepository = AppDataSource.getRepository(CD);
    const cds = await cdRepository.find();
    res.json({ data: cds });
});

// Atualizar CD 
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, artist, price, stock } = req.body;

    const cdRepository = AppDataSource.getRepository(CD);
    const cd = await cdRepository.findOneBy({ id: parseInt(id) });

    if (!cd) {
        return res.status(404).json({ message: 'CD não encontrado' });
    }

    cd.title = title || cd.title;
    cd.artist = artist || cd.artist;
    cd.price = price || cd.price;
    cd.stock = stock || cd.stock;

    await cdRepository.save(cd);
    res.status(200).json({ data: cd });
});

// Deletar CD 
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;

    const cdRepository = AppDataSource.getRepository(CD);
    const cd = await cdRepository.findOneBy({ id: parseInt(id) });

    if (!cd) {
        return res.status(404).json({ message: 'CD não encontrado' });
    }

    await cdRepository.remove(cd);
    res.status(204).json();
});

export default router;
