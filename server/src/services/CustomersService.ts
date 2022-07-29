import { getCustomRepository, Repository } from "typeorm";

import { Customer } from '../entities/Customer';
import { CustomersRepository } from "../repositories/CustomersRepository";

interface ICustomer {
    cus_cpf: string;
    cus_name: string;
    cus_phone: string;
}

class CustomersService {
    private customersRepository : Repository<Customer>;

    constructor() {
        this.customersRepository = getCustomRepository(CustomersRepository);
    }

    async create({
        cus_cpf,
        cus_name,
        cus_phone
    }: ICustomer) {
        const customerAlreadyExists = await this.customersRepository.findOne({
            cus_cpf,
        });

        if (customerAlreadyExists) {
            throw new Error("Customer already exists!!")
        } 
        
        const customer = this.customersRepository.create({
            cus_cpf,
            cus_name,
            cus_phone
        });

        await this.customersRepository.save(customer);

        return customer;
    }

    async getCustomers() {
        const customers = await this.customersRepository.find();

        if (!customers) throw new Error("There is no customer registered in the database.");

        return customers;
    }

    async getCustomerById(id: string) {
        const customer = await this.customersRepository.findOne(id);

        if (!customer) {
            throw new Error("Customer does not exists!!");
        } 

        return customer;
    }

    async update(id: string, cus_name: string, cus_phone: string) {
        const customer = await this.customersRepository.findOne(id);

        if (!customer)
            throw new Error("Customer does not exists!!");

        this.customersRepository.merge(customer, {
            cus_name,
            cus_phone
        });

        const updatedCustomer = await this.customersRepository.save(customer);

        return updatedCustomer;
    }

    async remove(cus_cpf: string) {
        const customer = await this.customersRepository.findOne({
            cus_cpf
        });

        if (!customer) {
            throw new Error("Customer does not exists!!");
        }

        await this.customersRepository.remove(customer);

        return customer;
    }
}

export { CustomersService };