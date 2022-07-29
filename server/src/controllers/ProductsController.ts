import { Request, Response } from "express";

import { ProductsService } from "../services/ProductsService";

class ProductsController {

    async create(req: Request, res: Response) {
        const {
            pro_desc,
            pro_type,
            pro_unit_price
        } = req.body;

        const productsService = new ProductsService();

        try {
            const product = await productsService.create({
                pro_desc,
                pro_type,
                pro_unit_price
            });

            return res.status(201).json(product);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    async getProducts(req: Request, res: Response) {
        const productsService = new ProductsService();

        try {
            const products = await productsService.getProducts();
            return res.status(200).json(products);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        const productsService = new ProductsService();

        try {
            const product = await productsService.getProductById(id);

            return res.status(200).json(product);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { pro_desc, pro_type, pro_unit_price } = req.body;

        const productsService = new ProductsService();

        try {
            const product = await productsService.updateProduct(
                id,
                {
                    pro_desc,
                    pro_type,
                    pro_unit_price
                }
            );

            return res.status(200).json(product);
        } catch (err) {
            return res.status(400).json(err.message);
        }
    }

    async updateProductStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { pro_status } = req.body;

        const productsService = new ProductsService();

        try {
            const product = await productsService.updateProductStatus(id, pro_status);

            res.status(200).json(product);
        } catch (err) {
            res.status(400).json({ err: err.message });
        }
    }
}

export { ProductsController };