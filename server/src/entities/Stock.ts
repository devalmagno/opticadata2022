import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Product } from "./Product";

@Entity("stocks")
class Stock {

    @PrimaryColumn()
    sto_id: string;

    @JoinColumn({ name: "sto_pro_id" })
    @ManyToOne(() => Product)
    product: Product;

    @Column()
    sto_pro_id: string;

    @Column()
    sto_quantity: number;

    @Column()
    sto_min: number;

    @Column()
    sto_max: number;
 
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.sto_id) {
            this.sto_id = uuid(); 
        }
    }
}

export { Stock };