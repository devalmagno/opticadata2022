import { EntityRepository, Repository } from "typeorm";

import { CollaboratorsLogs } from "../entities/CollaboratorsLogs";

@EntityRepository(CollaboratorsLogs)
class CollaboratorsLogsRepository extends Repository<CollaboratorsLogs> {

}

export { CollaboratorsLogsRepository };