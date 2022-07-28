import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("customers")
class Customer {

    @PrimaryColumn()
    cus_id: string;

    @Column()
    cus_cpf: string;
    
    @Column()
    cus_name: string;

    @Column()
    cus_phone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.cus_id) {
            this.cus_id = uuid();
        }
    }
}

export { Customer }; 