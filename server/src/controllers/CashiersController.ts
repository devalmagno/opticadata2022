import { Request, Response } from "express";

import { CashiersService } from "../services/CashiersService";

class CashiersController {
    async create(req: Request, res: Response) {
        const {
            cas_col_id,
            cas_initial_value,
            cas_opened_at
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
        const { id } = req.params;

        const cashiersService = new CashiersService();

        try {
            const cashiers = await cashiersService.getCashiers();

            return res.status(200).json(cashiers);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCashierById(req: Request, res: Response) {
        const { id } = req.params;

        const cashiersService = new CashiersService();

        try {
            const cashiers = await cashiersService.getCashierById(id);

            return res.status(200).json(cashiers);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async closeCashier(req: Request, res: Response) {
        const { id } = req.params;

        const cashiersService = new CashiersService();

        try {
            const cashiers = await cashiersService.closeCashier(id);

            return res.status(200).json(cashiers);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

}

export { CashiersController };