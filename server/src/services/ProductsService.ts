
import { getCustomRepository, Repository } from 'typeorm';

import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

import { StockService } from './StockService';

interface IProduct {
    pro_type: string;
    pro_desc: string;
    pro_unit_price: number;
}

class ProductsService {
    private productsRepository : Repository<Product>;

    constructor() {
        this.productsRepository = getCustomRepository(ProductsRepository);
    }

    async create({ pro_desc, pro_type, pro_unit_price }: IProduct) {
        const productAlreadyExists = await this.productsRepository.findOne({
            pro_desc,
        });

        if (productAlreadyExists) {
            throw new Error("Product already exists!!");
        }

        const product = this.productsRepository.create({
           pro_desc,
           pro_unit_price,
           pro_type 
        });

        await this.productsRepository.save(product);

        return product;
    }

    async getProducts() {
        const products = await this.productsRepository.find();

        if (!products) throw new Error("There is no product data in the database");

        return products;
    }

    async getProductById(id: string) {
        const product = await this.productsRepository.findOne({
            pro_id: id
        });

        if (!product) {
            throw new Error("Product doesn't exists!!");
        }

        return product;
    }

    async updateProduct(id: string, { pro_desc, pro_type, pro_unit_price}: IProduct) {
        const product = await this.productsRepository.findOne({
            pro_id: id,
        });

        if (!product) {
            throw new Error("Product doesn't exists!!");
        }

        this.productsRepository.merge(product, {
            pro_desc, 
            pro_unit_price, 
            pro_type,
        });

        const updatedProduct = await this.productsRepository.save(product);

        return updatedProduct;
    }

    async updateProductStatus(id: string, pro_status: boolean) {
        const product = await this.productsRepository.findOne({
            pro_id: id
        });

        if (!product) throw new Error("Product doesn't exists!!");
        if (product.pro_status == pro_status && pro_status == true) throw new Error("Product alredy enabled");
        if (product.pro_status == pro_status && pro_status == false) throw new Error("Product alredy disabled");

        this.productsRepository.merge(product, {
            pro_status
        });

        const updatedProduct = await this.productsRepository.save(product);

        return updatedProduct;
    }
}

export { ProductsService };