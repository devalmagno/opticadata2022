import { getCustomRepository, Repository } from "typeorm";

import { CollaboratorsLogs } from "../entities/CollaboratorsLogs";
import { CollaboratorsLogsRepository } from "../repositories/CollaboratorLogsRepository";

interface ICollaboratorsLogs {
    clog_col_id: string;
    clog_old_col_function: string;
};

class CollaboratorsLogsService {
    private collaboratorsLogsRepository : Repository<CollaboratorsLogs>;

    constructor() {
        this.collaboratorsLogsRepository = getCustomRepository(CollaboratorsLogsRepository);
    }

    async create({ clog_col_id, clog_old_col_function }: ICollaboratorsLogs) {
       const collaboratorLog = this.collaboratorsLogsRepository.create({
            clog_col_id,
            clog_old_col_function
        });

        await this.collaboratorsLogsRepository.save(collaboratorLog);

        return collaboratorLog;
    }

    async getCollaboratorsLogs() {
        const collaboratorsLogs = await this.collaboratorsLogsRepository.find();

        if (!collaboratorsLogs)
            throw new Error("There is no collaborators logs' data in the database.");

        return collaboratorsLogs;
    }

    async getCollaboratorLogsByCollaboratorId(id: string) {
        const collaboratorLogs = await this.collaboratorsLogsRepository.findOne({
            clog_col_id: id
        });

        if (!collaboratorLogs) throw new Error("Logs does not exists!");

        return collaboratorLogs;
    }
}

export { CollaboratorsLogsService };