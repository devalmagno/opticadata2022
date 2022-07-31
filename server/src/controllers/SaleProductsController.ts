import { Request, Response } from "express";

import { SaleProductsService } from "../services/SaleProductsService";

class SaleProductsController {
    async create(req: Request, res: Response) {
        const { 
            spr_pro_id,
            spr_quantity,
            spr_sal_id
        } = req.body;

        const salesProductService = new SaleProductsService();

        try {
            const saleProduct = await salesProductService.create({
                spr_pro_id,
                spr_quantity,
                spr_sal_id
            });
    
            return res.status(201).json(saleProduct);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getSaleProducts(req: Request, res: Response) {
        const salesProductService = new SaleProductsService();

        try {
            const saleProducts = await salesProductService.getSaleProcuts();

            return res.status(200).json(saleProducts);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSaleProductBySaleId(req: Request, res: Response) {
        const { id } = req.params;

        const salesProductService = new SaleProductsService();

        try {
            const saleProducts = await salesProductService.getSaleProcutsBySaleId(id);

            return res.status(200).json(saleProducts);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getSaleByProductId(req: Request, res: Response) {
        const { id } = req.params;

        const salesProductService = new SaleProductsService();

        try {
            const saleProducts = await salesProductService.getSaleProductsByProductId(id);

            return res.status(200).json(saleProducts);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { SaleProductsController };