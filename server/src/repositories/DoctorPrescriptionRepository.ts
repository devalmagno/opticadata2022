import { EntityRepository, Repository } from 'typeorm';

import { DoctorPrescription } from '../entities/DoctorPrescription';

@EntityRepository(DoctorPrescription)
class DoctorPrescriptionRepository extends Repository<DoctorPrescription> {

}

export { DoctorPrescriptionRepository };