import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Customer } from "./Customer";

@Entity("customer_addresses")
class CustomerAddress {

    @PrimaryColumn()
    cad_id: string;

    @JoinColumn({ name: "cad_cus_id" })
    @ManyToOne(() => Customer)
    customer: Customer;

    @Column()
    cad_cus_id: string;

    @Column()
    cad_city: string;
    
    @Column()
    cad_district: string;

    @Column()
    cad_desc: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.cad_id) {
            this.cad_id = uuid(); 
        }
    }
}

export { CustomerAddress };