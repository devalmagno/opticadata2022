import { EntityRepository, Repository } from "typeorm";

import { StockMove } from "../entities/StockMove";

@EntityRepository(StockMove)
class StockMovesRepository extends Repository<StockMove> {

}

export { StockMovesRepository };