import { Request, Response } from "express";

import { CollaboratorsLogsService } from "../services/CollaboratorLogsService";

class CollaboratorLogsController {
    async getCollaboratorsLogs(req: Request, res: Response) {
        const collaboratorLogsService = new CollaboratorsLogsService();

        try {
            const collaboratorsLogs = await collaboratorLogsService.getCollaboratorsLogs();
            console.log(collaboratorsLogs);

            return res.status(200).json(collaboratorsLogs);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCollaboratorLogsByCollaboratorId(req: Request, res: Response) {
        const { id } = req.params;
        const collaboratorLogsService = new CollaboratorsLogsService();

        try {
            const collaboratorsLogs = await collaboratorLogsService.getCollaboratorLogsByCollaboratorId(id);

            return res.status(200).json(collaboratorsLogs);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export { CollaboratorLogsController };