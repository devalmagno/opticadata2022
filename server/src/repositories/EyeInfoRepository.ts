import { EntityRepository, Repository } from 'typeorm';

import { EyeInfo } from '../entities/EyeInfo';

@EntityRepository(EyeInfo)
class EyeInfoRepository extends Repository<EyeInfo> {

}

export { EyeInfoRepository };