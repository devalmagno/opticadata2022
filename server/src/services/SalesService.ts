import { getCustomRepository, Repository } from "typeorm";

import { Sale } from "../entities/Sale";
import { SalesRepository } from "../repositories/SalesRepository";

interface ISale {
    sal_dpr_id: string;
    sal_col_id: string;
    sal_cus_id: string;
    sal_cad_id: string;
    sal_sold_at: Date;
    sal_delivery_day: Date;
};

class SalesService {
    private salesRepository : Repository<Sale>;

    constructor() {
        this.salesRepository = getCustomRepository(SalesRepository);
    }

    async create({
        sal_cad_id,
        sal_col_id,
        sal_cus_id,
        sal_delivery_day,
        sal_dpr_id,
        sal_sold_at,
    }: ISale) {
        const sale = this.salesRepository.create({
            sal_cad_id,
            sal_col_id,
            sal_cus_id,
            sal_delivery_day,
            sal_dpr_id,
            sal_sold_at
        });

        await this.salesRepository.save(sale);

        return sale;
    }

    async getSales() {
        const sales = await this.salesRepository.find();

        if (!sales) throw new Error("There is no sale in the database.");

        return sales;
    }

    async getSalesByCustomerId(sal_cus_id: string) {
        const sales = await this.salesRepository.find({
            where: { sal_cus_id }
        });

        if (!sales) throw new Error("There is no sale in the database.");

        return sales;
    }

    async getSalesByCollaboratorId(sal_col_id: string) {
        const sales = await this.salesRepository.find({
            where: { sal_col_id }
        });

        if (!sales) throw new Error("There is no sale in the database.");

        return sales;
    }

    async getSalesByDoctorPrescriptionId(sal_dpr_id: string) {
        const sales = await this.salesRepository.find({
            where: { sal_dpr_id }
        });

        if (!sales) throw new Error("There is no sale in the database.");

        return sales;
    }

    async updateDeliveryDay(id: string, sal_delivery_day: Date) {
        const sale = await this.salesRepository.findOne(id);

        if (!sale) throw new Error("Sale do not exists!");

        this.salesRepository.merge(sale, { sal_delivery_day });

        const updatedSale = await this.salesRepository.save(sale);

        return updatedSale;
    }

    async updatePaymentStatus(id: string, sal_status_pay: boolean) {
        const sale = await this.salesRepository.findOne(id);

        if (!sale) throw new Error("Sale do not exists!");

        this.salesRepository.merge(sale, { sal_status_pay });

        const updatedSale = await this.salesRepository.save(sale);

        return updatedSale;
    }

    async updateSaleStatus(id: string) {
        const sale = await this.salesRepository.findOne(id);

        if (!sale) throw new Error("Sale do not exists!");

        const sal_status = !sale.sal_status;

        this.salesRepository.merge(sale, { sal_status });

        const updatedSale = await this.salesRepository.save(sale);

        return updatedSale;
    }

}

export { SalesService };
