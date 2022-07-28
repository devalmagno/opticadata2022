import { Request, Response } from "express";

import { CashierMovesService } from "../services/CashierMovesService";

class CashierMovesController {
    async create(req: Request, res: Response) {
        const {
            cmo_cas_id, 
            cmo_desc, 
            cmo_type, 
            cmo_value            
        } = req.body;

        const cashierMovesService = new CashierMovesService();

        try {
            const cashierMoves = await cashierMovesService.create({
                cmo_cas_id, 
                cmo_desc, 
                cmo_type, 
                cmo_value
            });

            return res.status(201).json(cashierMoves);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async get(req: Request, res: Response) {
        const cashierMovesService = new CashierMovesService();

        try {
            const cashierMoves = await cashierMovesService.getCashierMoves();

            return res.status(200).json(cashierMoves);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCashierMovesByCashierId(req: Request, res: Response) {
        const { id } = req.params;
        const cashierMovesService = new CashierMovesService();

        try {
            const cashierMoves = await cashierMovesService.getCashierMovesByCasId(id);

            return res.status(200).json(cashierMoves);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export { CashierMovesController };