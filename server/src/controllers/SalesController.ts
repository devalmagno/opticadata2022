import { Request, Response } from "express";

import { SalesService } from "../services/SalesService";

class SalesController {
    async create(req: Request, res: Response) {
        const { 
            sal_cad_id,
            sal_col_id,
            sal_cus_id,
            sal_delivery_day,
            sal_dpr_id,
            sal_sold_at
        } = req.body;

        const salesService = new SalesService();

        try {
            const sale = await salesService.create({
                sal_cad_id,
                sal_col_id,
                sal_cus_id,
                sal_delivery_day,
                sal_dpr_id,
                sal_sold_at
            });
    
            return res.status(201).json(sale);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getSales(req: Request, res: Response) {
        const salesService = new SalesService();
        
        try {
            const sales = await salesService.getSales();

            return res.status(200).json(sales);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSaleByCustomerId(req: Request, res: Response) {
        const { id } = req.params;

        const salesService = new SalesService();

        try {
            const sales = await salesService.getSalesByCustomerId(id);

            return res.status(200).json(sales);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSaleByCollaboratorId(req: Request, res: Response) {
        const { id } = req.params;

        const salesService = new SalesService();

        try {
            const sales = await salesService.getSalesByCollaboratorId(id);

            return res.status(200).json(sales);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSaleByDoctorPrescriptionId(req: Request, res: Response) {
        const { id } = req.params;

        const salesService = new SalesService();

        try {
            const sales = await salesService.getSalesByDoctorPrescriptionId(id);

            return res.status(200).json(sales);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateDeliveryDay(req: Request, res: Response) {
        const { id } = req.params;
        const { sal_delivery_day } = req.body;

        const salesService = new SalesService();

        try {
            const sale = await salesService.updateDeliveryDay(id, sal_delivery_day);

            return res.status(200).json(sale);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateSaleStatus(req: Request, res: Response) {
        const { id } = req.params;

        const salesService = new SalesService();

        try {
            const sale = await salesService.updateSaleStatus(id);

            return res.status(200).json(sale);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { SalesController };