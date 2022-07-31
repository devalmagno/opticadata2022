import { getCustomRepository, Repository } from "typeorm";

import { Collaborator } from "../entities/Collaborators";
import { CollaboratorsRepository } from "../repositories/CollaboratorsRepository";

import { CollaboratorsLogsService } from "../services/CollaboratorLogsService";

interface ICollaboratorsCreate {
    col_name: string;
    col_cpf?: string;
    col_function: string;
};

class CollaboratorsService {
    private collaboratorsRepository : Repository<Collaborator>;

    constructor() {
        this.collaboratorsRepository = getCustomRepository(CollaboratorsRepository);
    }

    async create({ col_name, col_cpf, col_function }: ICollaboratorsCreate) {
        const cpfAlreadyExists = await this.collaboratorsRepository.findOne({
            col_cpf
        });

        if (cpfAlreadyExists)
            throw new Error("Collaborators already exists!!");

        const collaborator = this.collaboratorsRepository.create({
            col_name,
            col_cpf,
            col_function
        });

        await this.collaboratorsRepository.save(collaborator);

        const collaboratorsLogsService = new CollaboratorsLogsService();
        collaboratorsLogsService.create({ 
            clog_col_id: collaborator.col_id, 
            clog_old_col_function: collaborator.col_function
        });

        return collaborator;
    }

    async getCollaborators() {
        const collaborators = await this.collaboratorsRepository.find();

        if (!collaborators)
            throw new Error("There is no collaborator's data in the database.");

        return collaborators;
    }

    async getCollaboratorById(id: string) {
        const collaborator = await this.collaboratorsRepository.findOne({
            col_id: id
        });

        if (!collaborator) throw new Error("Collaborator does not exists!");

        return collaborator;
    }

    async getCollaboratorByCPF(cpf: string) {
        const collaborator = await this.collaboratorsRepository.findOne({
            col_cpf: cpf
        });

        if (!collaborator) throw new Error("Collaborator does not exists!");

        return collaborator;
    }

    async updateCollaborator(id: string, { col_function, col_name, col_cpf }: ICollaboratorsCreate) {
        const collaborator = await this.collaboratorsRepository.findOne({
            col_id: id
        });

        if (!collaborator) throw new Error("Collaborator does not exists!");
        

        if (col_function == "") col_function = collaborator.col_function;
        else {
            const collaboratorsLogsService = new CollaboratorsLogsService();
            collaboratorsLogsService.create({ 
                clog_col_id: collaborator.col_id,
                clog_old_col_function: col_function
            });
        }

        this.collaboratorsRepository.merge(collaborator, { col_function, col_name });

        const updatedCollaborator = await this.collaboratorsRepository.save(collaborator);

        return updatedCollaborator;
    }

    async deleteCollaborator(id: string) {
        const collaborator = await this.collaboratorsRepository.findOne({
            col_id: id
        });

        if (!collaborator) throw new Error("Collaborator does not exists!");

        await this.collaboratorsRepository.remove(collaborator);

        return collaborator;
    }
}

export { CollaboratorsService };