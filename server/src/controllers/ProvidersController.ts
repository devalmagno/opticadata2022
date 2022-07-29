import { Request, Response } from 'express';

import { ProvidersService } from '../services/ProvidersService';

class ProvidersControllers {

    async create(req: Request, res: Response) {
        const {
            prov_cnpj,
            prov_desc, 
            prov_email       
        } = req.body;
 
        const providersService = new ProvidersService();

        try {
            const provider = await providersService.create({
                prov_cnpj,
                prov_desc, 
                prov_email       
            });

            return res.status(201).json(provider);
        } catch(err) {
            return res.status(401).json(err.message)
        }
    }

    async getProviders(req: Request, res: Response) {
        const providersService = new ProvidersService();
        
        try {
            const providers = await providersService.getProviders();

            return res.status(201).json(providers);
        } catch(err) {
            return res.status(401).json(err.message)
        }
    }

    async getProviderById(req: Request, res: Response) {
        const { id } = req.params;
        const providersService = new ProvidersService();
        
        try {
            const providers = await providersService.getProviderById(id);

            return res.status(201).json(providers);
        } catch(err) {
            return res.status(401).json(err.message)
        }
    }

    async updateProvider(req: Request, res: Response) {
        const { id } = req.params;
        const {
            prov_desc,
            prov_email
        } = req.body;

        const providersService = new ProvidersService();
        
        try {
            const provider = await providersService.updateProvider(
                id,
                prov_desc,
                prov_email
            );

            return res.status(201).json(provider);
        } catch(err) {
            return res.status(401).json(err.message)
        }
    }

    async removeProvider(req: Request, res: Response) {
        const { id } = req.params;

        const providersService = new ProvidersService();
        
        try {
            const provider = await providersService.removeProvider(id);

            return res.status(201).json(provider);
        } catch(err) {
            return res.status(401).json(err.message)
        }
    }
}

export { ProvidersControllers };