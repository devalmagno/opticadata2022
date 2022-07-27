import { Request, Response, NextFunction } from "express";

import { UsersService } from "../services/UsersService";

class UsersController {
    async create(req: Request, res: Response) {
        const { 
            user_col_id,
            user_is_admin,
            user_password 
        } = req.body;

        const usersService = new UsersService();

        try {
            const user = await usersService.create({
            user_col_id,
            user_is_admin,
            user_password 
            });
    
            return res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async get(req: Request, res: Response) {
        const usersService = new UsersService();

        try {
            const users = await usersService.get();

            return res.status(200).json(users);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const usersService = new UsersService();

        try {
            const user = await usersService.getById(id);

            return res.status(200).json(user);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { user_is_admin } = req.body;

        const usersService = new UsersService();

        try {
            const user = await usersService.update(id, user_is_admin);
        
            res.status(201).json(user);
        } catch(err) {
            return res.status(400).json({ err: err.message });
        } 
    }

    async updatePassword(req: Request, res: Response) {
        const { id } = req.params;
        const { password, newPassword } = req.body;
        
        const usersService = new UsersService();

        try {
            const user = await usersService.updatePassword(id, password, newPassword);
        
            res.status(201).json(user);
        } catch(err) {
            return res.status(400).json({ err: err.message });
        } 
    }

    async removeWorker(req: Request, res: Response) {
        const { id } = req.params;

        const usersService = new UsersService();

        try {
            const user = await usersService.remove(id);

            return res.status(200).json(user);
        } catch(err) {
            return res.status(400).json({ err: err.message });
        }     
    }

    async login(req: Request, res: Response) {
        const { id, password } = req.body;
        
        const usersService = new UsersService();

        try {
            const acessToken = await usersService.login(id, password);

            return res.status(200).json({ acessToken: acessToken });
        } catch (err) {
            return res.status(401).json({
                message: err.message
            });
        }
    }

    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        const usersService = new UsersService();

        if (token == null) return res.status(401).json({
            message: "Token is null"
        });

        try {
            await usersService.authenticate(token);

            next();
        } catch(err) {
            res.status(401).json({ message: err.message });
        }
    }
}

export { UsersController };