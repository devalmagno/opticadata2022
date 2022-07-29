import { getCustomRepository, Repository } from "typeorm";

import { StockMove } from '../entities/StockMove';
import { StockMovesRepository } from "../repositories/StockMovesRepository";

import { StockService } from "./StockService";

interface IStockMove {
    smo_pro_id: string;
    smo_prov_id: string;
    smo_quantity: number;
    smo_type: string;
    smo_desc: string;
    smo_unit_price: number;
}

class StockMovesService {
    private stockMovesRepository : Repository<StockMove>;

    constructor() {
        this.stockMovesRepository = getCustomRepository(StockMovesRepository);
    }

    async create({ 
        smo_desc = "venda",
        smo_pro_id,
        smo_prov_id = null,
        smo_quantity,
        smo_type = "o",
        smo_unit_price = 0
    }: IStockMove) {
        const stockService = new StockService();
        const { sto_id: smo_sto_id } = await stockService.getStockByProduct(smo_pro_id);

        if (!smo_sto_id) throw new Error("Stock for product doesn't exists!!");

        const stockMove = this.stockMovesRepository.create({
            smo_desc,
            smo_pro_id,
            smo_prov_id,
            smo_quantity,
            smo_sto_id,
            smo_type,
            smo_unit_price   
        });

        await this.stockMovesRepository.save(stockMove);


        return stockMove;
    }

    async getStockMoves() {
        const stockMoves = await this.stockMovesRepository.find();

        if (!stockMoves) throw new Error("There is no stock in the database");

        return stockMoves;
    }

    async getStockMovesByStockId(smo_sto_id: string) {
        const stockMoves = await this.stockMovesRepository.findOne({
            where: { smo_sto_id }
        });

        if (!stockMoves) throw new Error("Stock Moves do not exists");

        return stockMoves;
    }
}

export { StockMovesService };