import { getCustomRepository, Repository } from "typeorm";

import { Payment } from "../entities/Payment";
import { PaymentsRepository } from "../repositories/PaymentsRepository";

interface IPayments {
    pay_sal_id: string;
    pay_type_of_payment: string;
    pay_desc: string;
    pay_value: number;
    pay_pending_date: Date;
}

class PaymentsService {
    private paymentsRepository : Repository<Payment>;

    constructor() {
        this.paymentsRepository = getCustomRepository(PaymentsRepository);
    }

    async create({ 
        pay_sal_id,
        pay_pending_date = null,
        pay_desc,
        pay_type_of_payment,
        pay_value
    }: IPayments) {
        const payment = this.paymentsRepository.create({
            pay_sal_id,
            pay_desc,
            pay_type_of_payment,
            pay_value,
            pay_pending_date
        });

        await this.paymentsRepository.save(payment);

        return payment;
    }

    async getPaymentsBySaleId(pay_sal_id: string) {
        const payments = await this.paymentsRepository.find({
            where: pay_sal_id
        });

        if (!payments) throw new Error("There is no payment in the database");

        return payments;
    }

    async getPaymentById(id: string) {
        const payment = await this.paymentsRepository.findOne(id);

        if (!payment) throw new Error("Payment do not exists");
        
        return payment;
    }

    async updatePaymentStatus(id: string) {
        const payment = await this.paymentsRepository.findOne(id);

        if (!payment) throw new Error("Payment do not exists");

        const pay_status = !payment.pay_status;
        let pay_date: Date = null;
        if (pay_status)
            pay_date = new Date();

        this.paymentsRepository.merge(payment, {
            pay_date,
            pay_status
        });

        const updatedPayment = await this.paymentsRepository.save(payment);

        return updatedPayment;
    }
}

export { PaymentsService };