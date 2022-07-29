import { EntityRepository, Repository } from 'typeorm';

import { CustomerAddress } from '../entities/CustomerAddress';

@EntityRepository(CustomerAddress)
class CustomerAddressesRepository extends Repository<CustomerAddress> {

}

export { CustomerAddressesRepository };