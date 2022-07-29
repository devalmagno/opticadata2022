import { Request, Response } from "express";

import { CustomerAdressesService } from "../services/CustomerAdressesService";

class CustomerAddressesController {
    async create(req: Request, res: Response) {
        const { 
            cad_city,
            cad_cus_id,
            cad_desc,
            cad_district 
        } = req.body;

        const customerAddressesService = new CustomerAdressesService();

        try {
            const customerAddress = await customerAddressesService.create({
                cad_city,
                cad_cus_id,
                cad_desc,
                cad_district            
            });
    
            return res.status(201).json(customerAddress);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }
    
    async getCustomerAddressesByCustomerId(req: Request, res: Response) {
        const { id } = req.params;

        const customerAddressesService = new CustomerAdressesService();

        try {
            const customerAddress = await customerAddressesService.getCustomerAddressByCustomerId(id);

            return res.status(200).json(customerAddress);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { 
            cad_city,
            cad_cus_id,
            cad_desc,
            cad_district 
        } = req.body;

        const customerAddressesService = new CustomerAdressesService();

        try {
            const customerAddress = await customerAddressesService.update(
                id,
                {
                    cad_city,
                    cad_cus_id,
                    cad_desc,
                    cad_district
                }
            );

            return res.status(200).json(customerAddress);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;

        const customerAddressesService = new CustomerAdressesService();

        try {
            const customerAddress = await customerAddressesService.remove(id);

            return res.status(200).json(customerAddress);
        } catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export { CustomerAddressesController };