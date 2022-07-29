import { EntityRepository, Repository } from "typeorm";

import { SaleProduct } from "../entities/SaleProduct";

@EntityRepository(SaleProduct)
class SaleProductsRepository extends Repository<SaleProduct> {

}

export { SaleProductsRepository };