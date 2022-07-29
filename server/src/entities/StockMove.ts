import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Product } from "./Product";
import { Provider } from "./Provider";
import { Stock } from "./Stock";

@Entity("stock_moves")
class StockMove {

    @PrimaryColumn()
    smo_id: string;

    @JoinColumn({ name: "smo_pro_id" })
    @ManyToOne(() => Product)
    product: Product;

    @Column()
    smo_pro_id: string;

    @JoinColumn({ name: "smo_prov_id" })
    @ManyToOne(() => Provider)
    provider: Provider;

    @Column()
    smo_prov_id: string;

    @JoinColumn({ name: "smo_sto_id" })
    @ManyToOne(() => Stock)
    stock: Stock;

    @Column()
    smo_sto_id: string;

    @Column()
    smo_type: string;

    @Column()
    smo_desc: string;

    @Column()
    smo_quantity: number;

    @Column()
    smo_unit_price: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.smo_id) {
            this.smo_id = uuid(); 
        }
    }
}

export { StockMove };