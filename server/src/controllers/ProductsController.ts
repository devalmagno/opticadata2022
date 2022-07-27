import { Request, Response } from "express";

import { ProductsService } from "../services/ProductsService";

class ProductsController {

    async create(req: Request, res: Response) {
        const {
             productcategory_id, 
             name, 
             unit_price, 
        } = req.body;

        const productsService = new ProductsService();

        try {
            const product = await productsService.create({
                productcategory_id,
                name,
                unit_price,
            });

            return res.status(201).json(product);
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }

    async getProducts(req: Request, res: Response) {
        const productsService = new ProductsService();

        const products = await productsService.getProducts();

        return res.status(200).json(products);
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        const productsService = new ProductsService();

        try {
            const product = await productsService.getProductById(id);

            return res.status(200).json(product);
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { productcategory_id, name, cost_price, unit_price, amount, total_sold } = req.body;

        const productsService = new ProductsService();

        try {
            const product = await productsService.updateProduct({
                productcategory_id,
                id,
                name,
                unit_price,
            });

            return res.status(200).json(product);
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }

    async removeProduct(req: Request, res: Response) {
        const { id } = req.params;

        const productsService = new ProductsService();

        try {
            const product = await productsService.removeProduct(id);

            res.status(200).json(product);
        } catch(err) {
            res.status(400).json({ err: err.message });
        }
    }
}

export { ProductsController };