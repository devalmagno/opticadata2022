import { getCustomRepository, Repository } from "typeorm";

import { Cashier } from "../entities/Cashier";
import { CashierRepository } from "../repositories/CashiersRepository";

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
}

export { CashiersService };