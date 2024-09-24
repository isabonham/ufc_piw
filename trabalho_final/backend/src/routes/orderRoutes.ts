import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { CD } from "../entity/CD";

const router = Router();

// Criar pedido
router.post('/', async (req, res) => {
    const { userId, items } = req.body; 
    
    if (!userId || !items || !items.length) {
        return res.status(400).json({ message: 'Dados incompletos' });
    }

    const orderRepository = AppDataSource.getRepository(Order);
    const cdRepository = AppDataSource.getRepository(CD);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
        const cd = await cdRepository.findOneBy({ id: item.cdId });

        if (!cd) {
            return res.status(400).json({ message: `CD com ID ${item.cdId} não encontrado.` });
        }

        if (cd.stock < item.quantity) {
            return res.status(400).json({ 
                message: `O CD "${cd.title}" tem estoque insuficiente. Quantidade disponível: ${cd.stock}, quantidade solicitada: ${item.quantity}.`
            });
        }

        const orderItem = new OrderItem();
        orderItem.cd = cd;
        orderItem.quantity = item.quantity;
        orderItem.price = cd.price * item.quantity;
        totalAmount += orderItem.price;

        cd.stock -= item.quantity; 
        await cdRepository.save(cd); 

        const savedOrderItem = await orderItemRepository.save(orderItem); 

        orderItems.push(savedOrderItem);
    }

    const newOrder = orderRepository.create({ user: { id: userId }, totalAmount, items: orderItems });
    await orderRepository.save(newOrder);

    res.status(201).json({ data: newOrder });
});


// Listar pedidos
router.get('/', async (req, res) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({ relations: ['items', 'items.cd', 'user'] });
    res.json({ data: orders });
});

export default router;
