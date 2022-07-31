import { getCustomRepository, Repository } from "typeorm";

import { Cashier } from "../entities/Cashier";
import { CashierRepository } from "../repositories/CashiersRepository";

import { CashierMovesService } from "../services/CashierMovesService";

interface ICashiersCreate {
    cas_col_id: string;
    cas_initial_value: number;
    cas_final_value: number;
    cas_opened_at: Date;
    cas_closed_at: Date;
};

class CashiersService {
    private cashiersRepository : Repository<Cashier>;

    constructor() {
        this.cashiersRepository = getCustomRepository(CashierRepository);
    }

    async create({ cas_col_id, cas_initial_value, cas_opened_at }: ICashiersCreate) {
        const cashier = this.cashiersRepository.create({
            cas_col_id,
            cas_initial_value,
            cas_opened_at
        });

        await this.cashiersRepository.save(cashier);

        return cashier;
    }

    async getCashiers() {
        const cashiers = await this.cashiersRepository.find();

        if (!cashiers)
            throw new Error("There is no cashier's data in the database.");

        return cashiers;
    }

    async getCashierById(id: string) {
        const cashier = await this.cashiersRepository.findOne(id);

        if (!cashier) throw new Error("Cashier do not exists!");

        return cashier;
    }

    async closeCashier(id: string) {
        const cashier = await this.cashiersRepository.findOne(id);

        if (!cashier) throw new Error("Cashier do not exists!");

        const cashierMovesService = new CashierMovesService();
        const cashierMoves = await cashierMovesService.getCashierMovesByCasId(cashier.cas_id);

        let cas_final_value: number = cashier.cas_initial_value;

        if (cashierMoves) {
            cashierMoves.forEach(cashierMove => {
                if (cashierMove.cmo_type == 'E') cas_final_value += cashierMove.cmo_value; 
                else cas_final_value -= cashierMove.cmo_value;
            });
        }

        this.cashiersRepository.merge(cashier, { cas_final_value, cas_closed_at: new Date()});

        const closedCashier = await this.cashiersRepository.save(cashier);

        return closedCashier;
    }

}

export { CashiersService };