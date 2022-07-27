import { EntityRepository, Repository } from "typeorm";

import { Collaborator } from "../entities/Collaborators";

@EntityRepository(Collaborator)
class CollaboratorsRepository extends Repository<Collaborator> {

}

export { CollaboratorsRepository };