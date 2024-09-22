import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    const userRole = (req as any).user?.role;
    if (userRole !== 'admin') {
        console.log('Acesso negado. Usuário não é admin.');
        return res.status(403).json({ message: 'Acesso negado. Somente administradores podem acessar.' });
    }
    console.log('Usuário é admin. Prosseguindo...');
    next(); 
};