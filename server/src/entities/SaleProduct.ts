import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Sale } from "./Sale";
import { Product } from "./Product";

@Entity("sale_products")
class SaleProduct {

    @PrimaryColumn()
    spr_id: string;

    @JoinColumn({ name: "spr_sal_id" })
    @ManyToOne(() => Sale)
    sale: Sale;

    @Column()
    spr_sal_id: string;

    @JoinColumn({ name: "spr_pro_id" })
    @ManyToOne(() => Product)
    product: Product;

    @Column()
    spr_pro_id: string;

    @Column()
    spr_quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.spr_id) {
            this.spr_id = uuid(); 
        }
    }
}

export { SaleProduct };