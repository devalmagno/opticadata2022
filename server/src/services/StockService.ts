import { getCustomRepository, Repository } from "typeorm";

import { Stock } from '../entities/Stock';
import { StockRepository } from "../repositories/StockRepository";

interface IStock {
    sto_pro_id: string;
    sto_quantity: number;
    sto_min: number;
    sto_max: number;
}

class StockService {
    private stockRepository : Repository<Stock>;

    constructor() {
        this.stockRepository = getCustomRepository(StockRepository);
    }

    async create({ 
        sto_max,
        sto_min,
        sto_pro_id,
        sto_quantity
    }: IStock) {
        const stockAlreadyExists = await this.stockRepository.findOne({
            where: { sto_pro_id }
        });

        if (stockAlreadyExists) throw new Error("Stock already exists.");
        
        const stock = this.stockRepository.create({
            sto_max,
            sto_min,
            sto_pro_id,
            sto_quantity   
        });

        await this.stockRepository.save(stock);

        return stock;
    }

    async getStocks() {
        const stocks = await this.stockRepository.find();

        if (!stocks) throw new Error("There is no stock in the database");

        return stocks;
    }

    async getStockByProduct(sto_pro_id: string) {
        const stock = await this.stockRepository.findOne({
            where: { sto_pro_id }
        });

        if (!stock) throw new Error("Stock do not exists");

        return stock;
    }

    async updateQuantityInStock(id: string, quantity: number, operationType: string) {
        const stock = await this.stockRepository.findOne(id);

        if (!stock) throw new Error("Stock do not exists");

        let sto_quantity = stock.sto_quantity;

        if (operationType == 'E') sto_quantity += quantity; 
        if (operationType == 'S') sto_quantity -= quantity; 

        if (sto_quantity > stock.sto_max || sto_quantity < stock.sto_min)
            throw new Error(`The quantity in stock must be between ${stock.sto_min}...${stock.sto_max}.`);

        this.stockRepository.merge(stock, { sto_quantity });

        const updatedStock = await this.stockRepository.save(stock);

        return updatedStock;
    }

    async updateStockMinOrMax(id: string, sto_min: number, sto_max: number) {
        const stock = await this.stockRepository.findOne(id);

        if (!stock) throw new Error("Stock do not exists");

        if (sto_min > stock.sto_quantity || sto_max < stock.sto_quantity)
            throw new Error(`Stock Min or Max must be greater or smaller than ${stock.sto_quantity}`);

        this.stockRepository.merge(stock, { sto_min, sto_max });

        const updatedStock = await this.stockRepository.save(stock);

        return updatedStock;
    }
}

export { StockService };