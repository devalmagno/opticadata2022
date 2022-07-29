import { Request, Response } from "express";
import { StockService } from "../services/StockService";


class StockController {
    async create(req: Request, res: Response) {
        const { 
            sto_max,
            sto_min,
            sto_pro_id,
            sto_quantity
        } = req.body;

        const stockService = new StockService();

        try {
            const stock = await stockService.create({
                sto_max,
                sto_min,
                sto_pro_id,
                sto_quantity           
            });
        
            return res.status(201).json(stock);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getStocks(req: Request, res: Response) {
        const stockService = new StockService();

        try {
            const stocks = await stockService.getStocks();
        
            return res.status(200).json(stocks);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getStocksByProduct(req: Request, res: Response) {
        const { sto_pro_id } = req.body;

        const stockService = new StockService();

        try {
            const stock = await stockService.getStockByProduct(sto_pro_id);
        
            return res.status(200).json(stock);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateStockMinOrMax(req: Request, res: Response) {
        const { id } = req.params;
        const { sto_min, sto_max } = req.body;

        const stockService = new StockService();

        try {
            const stock = await stockService.updateStockMinOrMax(id, sto_min, sto_max);
        
            return res.status(200).json(stock);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { StockController };