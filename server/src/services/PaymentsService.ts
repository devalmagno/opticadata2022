import { getCustomRepository, Repository } from "typeorm";

import { Payment } from "../entities/Payment";
import { PaymentsRepository } from "../repositories/PaymentsRepository";

interface IPaymentsCreate {
    id?: string;
    type_of_payment: string;
}

class PaymentsService {
    private paymentsRepository : Repository<Payment>;

    constructor() {
        this.paymentsRepository = getCustomRepository(PaymentsRepository);
    }

    async create({ type_of_payment }: IPaymentsCreate) {
        const payment = this.paymentsRepository.create({
            type_of_payment,
        });

        await this.paymentsRepository.save(payment);

        return payment;
    }

    async getPayments() {
        const payments = await this.paymentsRepository.find();

        if (!payments) throw new Error("There is no payment in the database");

        return payments;
    }

    async getPaymentById(id: string) {
        const payment = await this.paymentsRepository.findOne({
            id
        });

        if (!payment) throw new Error("Payment do not exists");
        
        return payment;
    }

    async removePayment(id: string) {
        const payment = await this.paymentsRepository.findOne({
            id
        });

        await this.paymentsRepository.remove(payment);

        return payment;
    }
}

export { PaymentsService };