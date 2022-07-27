import { getCustomRepository, Repository } from "typeorm";

import { CashierMoves } from "../entities/CashierMoves";
import { CashierMovesRepository } from "../repositories/CashierMovesRepository";

interface ICashierMoves {
    cmo_cas_id: string;
    cmo_type: string;
    cmo_desc: string;
    cmo_value: number;
};

class CashierMovesService {
    private cashierMovesRepository : Repository<CashierMoves>;

    constructor() {
        this.cashierMovesRepository = getCustomRepository(CashierMovesRepository);
    }

    async create({ cmo_cas_id, cmo_desc, cmo_type, cmo_value }: ICashierMoves) {
        const cashierMove = this.cashierMovesRepository.create({
            cmo_cas_id, 
            cmo_desc, 
            cmo_type, 
            cmo_value            
        });

        await this.cashierMovesRepository.save(cashierMove);

        return cashierMove;
    }

    async getCashierMoves() {
        const cashierMoves = await this.cashierMovesRepository.find();

        if (!cashierMoves)
            throw new Error("There is no cashier moves' data in the database.");

        return cashierMoves;
    }

    async getCashierMovesByCasId(cmo_cas_id: string) {
        const cashierMoves = await this.cashierMovesRepository.find({
            where: cmo_cas_id,
        });

        if (!cashierMoves)
            throw new Error("There is no cashier moves' data in the database.");

        return cashierMoves;
    }
}

export { CashierMovesService };