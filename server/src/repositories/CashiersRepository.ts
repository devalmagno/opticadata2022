import { EntityRepository, Repository } from "typeorm";

import { Cashier } from "../entities/Cashier";

@EntityRepository(Cashier)
class CashierRepository extends Repository<Cashier> {

}

export { CashierRepository };