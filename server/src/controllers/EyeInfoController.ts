import { Request, Response } from "express";

import { EyeInfoService } from "../services/EyeInfoService";

class EyeInfoController {
    async create(req: Request, res: Response) {
        const { 
            ein_cil,
            ein_dpr_id,
            ein_eixo,
            ein_esf,
            ein_type
        } = req.body;

        const eyeInfoService = new EyeInfoService();

        try {
            const eyeInfo = await eyeInfoService.create({
                ein_cil,
                ein_dpr_id,
                ein_eixo,
                ein_esf,
                ein_type
            });
    
            return res.status(201).json(eyeInfo);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getEyeInfoByDoctorPrescriptionId(req: Request, res: Response) {
        const { id } = req.params;

        const eyeInfoService = new EyeInfoService();
        
        try {
            const eyeInfo = await eyeInfoService.getEyeInfoByDoctorPrescriptionId(id);

            return res.status(200).json(eyeInfo);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            ein_cil,
            ein_eixo,
            ein_esf
        } = req.body;

        const eyeInfoService = new EyeInfoService();

        try {
            const eyeInfo = await eyeInfoService.update(
                id,
                ein_esf,
                ein_cil,
                ein_eixo,
            );

            return res.status(200).json(eyeInfo);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { EyeInfoController };