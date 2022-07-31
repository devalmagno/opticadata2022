import { Request, Response } from "express";

import { StockMovesService } from "../services/StockMovesService";
import { StockService } from "../services/StockService";

class StockMovesController {
    async create(req: Request, res: Response) {
        const { 
            smo_desc,
            smo_pro_id,
            smo_prov_id,
            smo_quantity,
            smo_type,
            smo_unit_price
        } = req.body;

        const stockMovesService = new StockMovesService();
        const stockService = new StockService();

        try {
            const stockMoves = await stockMovesService.create({
                smo_desc,
                smo_pro_id,
                smo_prov_id,
                smo_quantity,
                smo_type,
                smo_unit_price                          
            });

            await stockService.updateQuantityInStock(
                stockMoves.smo_sto_id,
                stockMoves.smo_quantity,
                stockMoves.smo_type
            )
        
            return res.status(201).json(stockMoves);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getStocks(req: Request, res: Response) {
        const stockMovesService = new StockMovesService();

        try {
            const stockMoves = await stockMovesService.getStockMoves();
        
            return res.status(200).json(stockMoves);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getStocksByStockId(req: Request, res: Response) {
        const { id } = req.params;

        const stockMovesService = new StockMovesService();

        try {
            const stockMoves = await stockMovesService.getStockMovesByStockId(id);
        
            return res.status(200).json(stockMoves);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { StockMovesController };