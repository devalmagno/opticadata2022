import { getCustomRepository, Repository } from "typeorm";

import { Settings } from "../entities/Settings";

import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettings {
    optics_name: string;
    optics_color: string;
    optics_unit: string;
}

class SettingsService {
    private settingsRepository : Repository<Settings>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ optics_color, optics_name, optics_unit }: ISettings) {
        const settings = this.settingsRepository.create({
            optics_color,
            optics_name,
            optics_unit    
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async getSettings() {
        const settings = await this.settingsRepository.find();
        console.log(settings);

        if (!settings) {
            throw new Error("There is no settings in the database, please create an worker before doing this operation.");
        }

        return settings;
    }
}

export { SettingsService };