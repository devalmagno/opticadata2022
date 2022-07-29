import { Request, Response } from "express";

import { PaymentsService } from "../services/PaymentsService";

class PaymentsController {

    async create(req: Request, res: Response) {
        const {
            pay_sal_id,
            pay_pending_date = null,
            pay_desc,
            pay_type_of_payment,
            pay_value
        } = req.body;

        const paymentsService = new PaymentsService();

        try {
            const payment = await paymentsService.create({
                pay_desc,
                pay_pending_date,
                pay_sal_id,
                pay_type_of_payment,
                pay_value
            });

            return res.status(201).json(payment);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getPaymentsBySaleId(req: Request, res: Response) {
        const { id } = req.params;

        const paymentsService = new PaymentsService();

        try {
            const payments = await paymentsService.getPaymentsBySaleId(id);

            return res.status(200).json(payments);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getPaymentById(req: Request, res: Response) {
        const { id } = req.params;

        const paymentsService = new PaymentsService();

        try {
            const payment = await paymentsService.getPaymentById(id);

            return res.status(200).json(payment);
        } catch(err) {
            return res.status(400).json({ message : err.message });
        }
    }

    async updatePaymentStatus(req: Request, res: Response) {
        const { id } = req.params;

        const paymentsService = new PaymentsService();

        try {
            const payment = await paymentsService.updatePaymentStatus(id);

            return res.status(200).json(payment);
        } catch(err) {
            return res.status(400).json({ message : err.message });
        }
    }

}

export { PaymentsController };