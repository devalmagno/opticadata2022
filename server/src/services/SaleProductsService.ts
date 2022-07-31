import { getCustomRepository, Repository } from "typeorm";

import { SaleProduct } from "../entities/SaleProduct";
import { SaleProductsRepository } from "../repositories/SaleProductsRepository";

interface ISaleProduct {
    spr_sal_id: string;
    spr_pro_id: string;
    spr_quantity: number;
};

class SaleProductsService {
    private saleProductsRepository : Repository<SaleProduct>;

    constructor() {
        this.saleProductsRepository = getCustomRepository(SaleProductsRepository);
    }

    async create({
        spr_pro_id,
        spr_quantity,
        spr_sal_id
    }: ISaleProduct) {
        const saleProduct = this.saleProductsRepository.create({
            spr_pro_id,
            spr_quantity,
            spr_sal_id
        });

        await this.saleProductsRepository.save(saleProduct);

        return saleProduct;
    }

    async getSaleProcuts() {
        const saleProducts = await this.saleProductsRepository.find();

        if (!saleProducts) throw new Error("There is no sale product in the database.");

        return saleProducts;
    }

    async getSaleProcutsBySaleId(spr_sal_id: string) {
        const saleProducts = await this.saleProductsRepository.find({
            where: { spr_sal_id }
        });

        if (!saleProducts) throw new Error("There is no sale product in the database.");

        return saleProducts;
    }

    async getSaleProductsByProductId(spr_pro_id: string) {
        const saleProducts = await this.saleProductsRepository.find({
            where: spr_pro_id
        });

        if (!saleProducts) throw new Error("There is no sale product in the database.");

        return saleProducts;
    }

}

export { SaleProductsService };