import { EntityRepository, Repository } from "typeorm";

import { CashierMoves } from "../entities/CashierMoves";

@EntityRepository(CashierMoves)
class CashierMovesRepository extends Repository<CashierMoves> {

}

export { CashierMovesRepository };