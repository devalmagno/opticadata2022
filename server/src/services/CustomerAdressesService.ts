import { getCustomRepository, Repository } from "typeorm";

import { CustomerAddress } from '../entities/CustomerAddress';
import { CustomerAddressesRepository } from "../repositories/CustomerAddressesRepository";

interface ICustomerAdress {
    cad_cus_id: string;
    cad_city: string;
    cad_district: string;
    cad_desc: string;
}

class CustomerAdressesService {
    private customerAdressesRepository : Repository<CustomerAddress>;

    constructor() {
        this.customerAdressesRepository = getCustomRepository(CustomerAddressesRepository);
    }

    async create({
        cad_city,
        cad_cus_id,
        cad_desc,
        cad_district 
    }: ICustomerAdress) {
        const customerAddress = this.customerAdressesRepository.create({
            cad_city,
            cad_cus_id,
            cad_desc,
            cad_district 
        });

        await this.customerAdressesRepository.save(customerAddress);

        return customerAddress;
    }

    async getCustomerAddressByCustomerId(id: string) {
        const customerAddresses = await this.customerAdressesRepository.find({
            where: {
                cad_cus_id: id
            }
        });

        if (!customerAddresses) throw new Error("There is no customer addresses registered in the database.");

        return customerAddresses;
    }

    async update(
        id: string,
        {
            cad_city,
            cad_cus_id,
            cad_desc,
            cad_district,
        }: ICustomerAdress
    ) {
        const customerAddress = await this.customerAdressesRepository.findOne(id);

        if (!customerAddress)
            throw new Error("Customer Address does not exists!!");

        this.customerAdressesRepository.merge(customerAddress, {
            cad_city,
            cad_cus_id,
            cad_desc,
            cad_district
        });

        const updatedCustomerAddress = await this.customerAdressesRepository.save(customerAddress);

        return updatedCustomerAddress;
    }

    async remove(id: string) {
        const customerAddress = await this.customerAdressesRepository.findOne(id);

        if (!customerAddress) {
            throw new Error("Customer Address does not exists!!");
        }

        await this.customerAdressesRepository.remove(customerAddress);

        return customerAddress;
    }
}

export { CustomerAdressesService };