import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Cashier } from "./Cashier";

@Entity("cashier_moves")
class CashierMoves {

    @PrimaryColumn()
    cmo_id: string;

    @JoinColumn({ name: "cmo_cas_id" })
    @ManyToOne(() => Cashier)
    cashiers: Cashier;

    @Column()
    cmo_cas_id: string;

    @Column()
    cmo_type: string;

    @Column()
    cmo_desc: string;

    @Column()
    cmo_value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.cmo_id) {
            this.cmo_id = uuid();
        }
    }
}

export { CashierMoves };