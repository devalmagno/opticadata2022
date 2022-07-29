import { Request, Response } from "express";

import { CustomersService } from "../services/CustomersService";

class CustomersController {
    async create(req: Request, res: Response) {
        const { 
            cus_cpf,
            cus_name,
            cus_phone
        } = req.body;

        const customersService = new CustomersService();

        try {
            const customer = await customersService.create({
                cus_cpf,
                cus_name,
                cus_phone
            });
    
            return res.status(201).json(customer);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }

    async getCustomers(req: Request, res: Response) {
        const customersService = new CustomersService();
        
        try {
            const customers = await customersService.getCustomers();

            return res.status(200).json(customers);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;

        const customersService = new CustomersService();

        try {
            const customer = await customersService.getCustomerById(id);

            return res.status(200).json(customer);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { cus_name, cus_phone } = req.body;

        const customersService = new CustomersService();

        try {
            const customer = await customersService.update(id, cus_name, cus_phone);

            return res.status(200).json(customer);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;

        const customersService = new CustomersService();

        try {
            const customer = await customersService.remove(id);

            return res.status(200).json(customer);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export { CustomersController };