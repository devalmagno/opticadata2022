import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Sale } from "./Sale";

@Entity("payments")
class Payment {

    @PrimaryColumn()
    pay_id: string;

    @JoinColumn({ name: "pay_sal_id" })
    @ManyToOne(() => Sale)
    sale: Sale;

    @Column()
    pay_sal_id: string;

    @Column()
    pay_type_of_payment: string;

    @Column()
    pay_desc: string;

    @Column()
    pay_value: number;

    @Column()
    pay_status: boolean;

    @CreateDateColumn()
    pay_date: Date;

    @CreateDateColumn()
    pay_pending_date: Date;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.pay_id) {
            this.pay_id = uuid();
        }

        if (!this.pay_pending_date) {
            let data = new Date();
            data.setDate(data.getDate() + 1);
            this.pay_pending_date = data;
        }
    }
}

export { Payment };