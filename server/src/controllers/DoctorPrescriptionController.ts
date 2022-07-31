import { Request, Response } from "express";

import { DoctorPrescriptionService } from "../services/DoctorPrescriptionService";

class DoctorPrescriptionController {
    async create(req: Request, res: Response) {
        const { 
            dpr_crm,
            dpr_dnp_od,
            dpr_dnp_oe,
            dpr_dp,
            dpr_height_segment,
            dpr_receipt_date       
        } = req.body;

        const doctorPrescriptionService = new DoctorPrescriptionService();

        try {
            const doctorPrescription = await doctorPrescriptionService.create({
                dpr_crm,
                dpr_dnp_od,
                dpr_dnp_oe,
                dpr_dp,
                dpr_height_segment,
                dpr_receipt_date
            });
    
            return res.status(201).json(doctorPrescription);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getDoctorPrescriptions(req: Request, res: Response) {
        const doctorPrescriptionService = new DoctorPrescriptionService();
        
        try {
            const doctorPrescriptions = await doctorPrescriptionService
                .getDoctorPrescriptions();

            return res.status(200).json(doctorPrescriptions);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getDoctorPrescriptionById(req: Request, res: Response) {
        const { id } = req.params;

        const doctorPrescriptionService = new DoctorPrescriptionService();
        
        try {
            const doctorPrescription = await doctorPrescriptionService
                .getDoctorPrescriptionById(id);

            return res.status(200).json(doctorPrescription);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            dpr_crm,
            dpr_dnp_od,
            dpr_dnp_oe,
            dpr_dp,
            dpr_height_segment,
            dpr_receipt_date
        } = req.body;

        const doctorPrescriptionService = new DoctorPrescriptionService();
        
        try {
            const doctorPrescription = await doctorPrescriptionService
                .update(id, {
                    dpr_crm,
                    dpr_dnp_od,
                    dpr_dnp_oe,
                    dpr_dp,
                    dpr_height_segment,
                    dpr_receipt_date
                });

            return res.status(200).json(doctorPrescription);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

export { DoctorPrescriptionController };