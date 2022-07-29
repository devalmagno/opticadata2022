import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("doctor_prescription")
class DoctorPrescription {

    @PrimaryColumn()
    dpr_id: string;

    @Column()
    dpr_dnp_od: number;
    
    @Column()
    dpr_dnp_oe: number;

    @Column()
    dpr_height_segment: number;

    @Column()
    dpr_dp: number;

    @Column()
    dpr_crm: string;
    
    @CreateDateColumn()
    dpr_receipt_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.dpr_id) {
            this.dpr_id = uuid();
        }
    }
}

export { DoctorPrescription }; 