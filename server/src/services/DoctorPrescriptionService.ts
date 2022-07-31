import { getCustomRepository, Repository } from "typeorm";

import { DoctorPrescription } from '../entities/DoctorPrescription';
import { DoctorPrescriptionRepository } from "../repositories/DoctorPrescriptionRepository";

interface IDoctorPrescription {
    dpr_dnp_od: number;
    dpr_dnp_oe: number;
    dpr_height_segment: number;
    dpr_dp: number;
    dpr_crm: string;
    dpr_receipt_date: Date;
}

class DoctorPrescriptionService {
    private doctorPrescriptionRepository : Repository<DoctorPrescription>;

    constructor() {
        this.doctorPrescriptionRepository = getCustomRepository(DoctorPrescriptionRepository);
    }

    async create({
        dpr_crm,
        dpr_dnp_od,
        dpr_dnp_oe,
        dpr_dp,
        dpr_height_segment,
        dpr_receipt_date    
    }: IDoctorPrescription) {
        const doctorPrescription = this.doctorPrescriptionRepository.create({
            dpr_crm,
            dpr_dnp_od,
            dpr_dnp_oe,
            dpr_dp,
            dpr_height_segment,
            dpr_receipt_date
        });

        await this.doctorPrescriptionRepository.save(doctorPrescription);

        return doctorPrescription;
    }

    async getDoctorPrescriptions() {
        const doctorPrescriptions = await this.doctorPrescriptionRepository.find();

        if (!doctorPrescriptions) throw new Error("There is no doctor prescription registered in the database.");

        return doctorPrescriptions;
    }

    async getDoctorPrescriptionById(dpr_id: string) {
        const doctorPrescription = await this.doctorPrescriptionRepository.findOne(dpr_id);

        if (!doctorPrescription) throw new Error("There is no doctor prescription registered in the database.");

        return doctorPrescription;
    }

    async update(
        id: string,
        {
            dpr_crm,
            dpr_dnp_od,
            dpr_dnp_oe,
            dpr_dp,
            dpr_height_segment,
            dpr_receipt_date,
        }: IDoctorPrescription
    ) {
        const doctorPrescription = await this.doctorPrescriptionRepository.findOne(id);

        if (!doctorPrescription)
            throw new Error("Doctor Prescription do not exists!!");

        this.doctorPrescriptionRepository.merge(doctorPrescription, {
            dpr_crm,
            dpr_dnp_od,
            dpr_dnp_oe,
            dpr_dp,
            dpr_height_segment,
            dpr_receipt_date
        });

        const updatedCustomer = await this.doctorPrescriptionRepository.save(doctorPrescription);

        return updatedCustomer;
    }

}

export { DoctorPrescriptionService };