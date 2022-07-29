import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { DoctorPrescription } from "./DoctorPrescription";

@Entity("eye_info")
class EyeInfo {

    @PrimaryColumn()
    ein_id: string;

    @JoinColumn({ name: "ein_dpr_id" })
    @ManyToOne(() => DoctorPrescription)
    doctor_prescription: DoctorPrescription;

    @Column()
    ein_dpr_id: string;

    @Column()
    ein_type: string;

    @Column()
    ein_esf: number;

    @Column()
    ein_cil: number;
 
    @CreateDateColumn()
    ein_eixo: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.ein_id) {
            this.ein_id = uuid(); 
        }
    }
}

export { EyeInfo };