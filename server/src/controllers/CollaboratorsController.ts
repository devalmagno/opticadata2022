import { Request, Response } from "express";

import { CollaboratorsService } from "../services/CollaboratorsService";

class CollaboratorsController {
    async create(req: Request, res: Response) {
        const {
            col_name,
            col_cpf,
            col_function
        } = req.body;

        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborator = await collaboratorsService.create({
                col_cpf,
                col_function,
                col_name
            });

            return res.status(201).json(collaborator);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCollaborators(req: Request, res: Response) {
        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborators = await collaboratorsService.getCollaborators();

            return res.status(200).json(collaborators);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCollaboratorById(req: Request, res: Response) {
        const { id } = req.params;
        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborator = await collaboratorsService.getCollaboratorById(id);

            return res.status(200).json(collaborator);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCollaboratorByCPF(req: Request, res: Response) {
        const { cpf } = req.params;
        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborator = await collaboratorsService.getCollaboratorByCPF(cpf);

            return res.status(200).json(collaborator);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    async updateCollaborator(req: Request, res: Response) {
        const { id } = req.params;
        const { col_function, col_name } = req.body;
        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborator = await collaboratorsService.updateCollaborator(id, {
                col_function, col_name, col_cpf: null
            });

            return res.status(200).json(collaborator);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteCollaborator(req: Request, res: Response) {
        const { id } = req.params;
        const collaboratorsService = new CollaboratorsService();

        try {
            const collaborator = await collaboratorsService.deleteCollaborator(id);

            return res.status(200).json(collaborator);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export { CollaboratorsController };