import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {

    async create(req: Request, res: Response) {
        const {
            optics_color,
            optics_name,
            optics_unit    
       } = req.body;

        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({
                optics_color,
                optics_name,
                optics_unit               
            });

            return res.status(201).json(settings);
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }

    async getSettings(req: Request, res: Response) {
        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.getSettings();
            return res.status(200).json(settings);
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }
}

export { SettingsController };