import { EntityRepository, Repository } from "typeorm";

import { Sale } from "../entities/Sale";

@EntityRepository(Sale)
class SalesRepository extends Repository<Sale> {

}

export { SalesRepository };