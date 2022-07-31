import { getCustomRepository, Repository } from "typeorm";

import { EyeInfo } from '../entities/EyeInfo';
import { EyeInfoRepository } from "../repositories/EyeInfoRepository";

interface IEyeInfo {
    ein_dpr_id: string;
    ein_type: string;
    ein_esf: number;
    ein_cil: number;
    ein_eixo: number;
}

class EyeInfoService {
    private eyeInfoRepository: Repository<EyeInfo>;

    constructor() {
        this.eyeInfoRepository = getCustomRepository(EyeInfoRepository);
    }

    async create({
        ein_cil,
        ein_dpr_id,
        ein_eixo,
        ein_esf,
        ein_type,
    }: IEyeInfo) {
        const eyeInfo = this.eyeInfoRepository.create({
            ein_cil,
            ein_dpr_id,
            ein_eixo,
            ein_esf,
            ein_type
        });

        await this.eyeInfoRepository.save(eyeInfo);

        return eyeInfo;
    }

    async getEyeInfo() {
        const eyeInfo = await this.eyeInfoRepository.find();

        if (!eyeInfo) {
            throw new Error("Eye info do not exists!!");
        }

        return eyeInfo;
    }

    async getEyeInfoByDoctorPrescriptionId(ein_dpr_id: string) {
        const eyeInfo = await this.eyeInfoRepository.find({
            where: { ein_dpr_id }
        });

        if (!eyeInfo) {
            throw new Error("Eye info do not exists!!");
        }

        return eyeInfo;
    }

    async update(
        id: string, 
        ein_esf: number,
        ein_cil: number,
        ein_eixo: number
    ) {
        const eyeInfo = await this.eyeInfoRepository.findOne(id);

        if (!eyeInfo)
            throw new Error("Eye Info do not exists!!");

        this.eyeInfoRepository.merge(eyeInfo, {
            ein_esf,
            ein_cil,
            ein_eixo            
        });

        const updatedEyeInfo = await this.eyeInfoRepository.save(eyeInfo);

        return eyeInfo;
    }

}

export { EyeInfoService };