import { Request, Response } from "express";

import { CashierMovesService } from "../services/CashierMovesService";

class CashiersController {
    async create(req: Request, res: Response) {
        const {
            cmo_cas_id, 
            cmo_desc, 
            cmo_type, 
            cmo_value            
 
        } = req.body;

        const cashiersService = new CashiersService();

        try {
            const cashier = await cashiersService.create({
                cas_col_id,
                cas_initial_value,
                cas_opened_at,
                cas_closed_at: null,
                cas_final_value: 0
            });

            return res.status(201).json(cashier);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCashiers(req: Request, res: Response) {
        const cashiersService = new CashiersService();

        try {
            const cashiers = await cashiersService.getCashiers();

            return res.status(200).json(cashiers);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export { CashiersController };