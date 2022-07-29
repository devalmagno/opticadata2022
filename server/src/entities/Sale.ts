import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Customer } from "./Customer";
import { CustomerAddress } from "./CustomerAddress";
import { DoctorPrescription } from "./DoctorPrescription";
import { Collaborator } from "./Collaborators";

@Entity("sales")
class Sale {

    @PrimaryColumn()
    sal_id: string;

    @JoinColumn({ name: "sal_cus_id" })
    @ManyToOne(() => Customer)
    customer: Customer;

    @Column()
    sal_cus_id: string;

    @JoinColumn({ name: "sal_cad_id" })
    @ManyToOne(() => CustomerAddress)
    customerAddress: CustomerAddress;

    @Column()
    sal_cad_id: string;

    @JoinColumn({ name: "sal_dpr_id" })
    @ManyToOne(() => DoctorPrescription)
    doctorPrescription: DoctorPrescription;

    @Column()
    sal_dpr_id: string;

    @JoinColumn({ name: "sal_col_id" })
    @ManyToOne(() => Collaborator)
    collaborator: Collaborator;

    @Column()
    sal_col_id: string;

    @Column()
    sal_sold_at: Date;

    @Column()
    sal_delivery_day: Date;

    @Column()
    sal_status_pay: boolean;

    @Column()
    sal_status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.sal_id) {
            this.sal_id = uuid(); 
        }
    }
}

export { Sale };