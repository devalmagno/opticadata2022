import { getCustomRepository, Repository } from "typeorm";

import { Provider } from "../entities/Provider";
import { ProvidersRepository } from "../repositories/ProvidersRepository";

interface IProvider {
    prov_cnpj: string;
    prov_desc: string;
    prov_email: string;
}

class ProvidersService {
    private providersRepository : Repository<Provider>;

    constructor() {
        this.providersRepository = getCustomRepository(ProvidersRepository);
    }

    async create({ 
        prov_cnpj,
        prov_desc, 
        prov_email, 
    }: IProvider) {
        const providerAlreadyExists = await this.providersRepository.findOne({ prov_cnpj });

        if (providerAlreadyExists)
            throw new Error("Provider already exists");
        

        const provider = this.providersRepository.create({
            prov_cnpj,
            prov_desc, 
            prov_email, 
        });

        await this.providersRepository.save(provider);

        return provider;
    }

    async getProviders() {
        const providers = await this.providersRepository.find();

        if (!providers) throw new Error("There is no provider in the database.");

        return providers;
    }

    async getProviderById(id: string) {
        const provider = await this.providersRepository.findOne(id);

        if (!provider) throw new Error("There is no provider in the database.");

        return provider;
    }

    async updateProvider(
        id: string,
        prov_desc: string,
        prov_email: string
    ) {
        const provider = await this.providersRepository.findOne(id);

        if (!provider) throw new Error("Provider does not exists!!");

        this.providersRepository.merge(provider, {
            prov_desc,
            prov_email
        });

        const updatedProvider = await this.providersRepository.save(provider);

        return updatedProvider;
    }

    async removeProvider(id: string) {
        const provider = await this.providersRepository.findOne(id);

        if (!provider) throw new Error("Provider does not exists!!");

        this.providersRepository.remove(provider);

        return provider;
    }
}

export { ProvidersService };