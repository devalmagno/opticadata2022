import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
class Product {

    @PrimaryColumn()
    pro_id: string;

    @Column()
    pro_type: string;

    @Column()
    pro_desc: string;

    @Column()
    pro_unit_price: number;

    @Column()
    pro_status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.pro_id) {
            this.pro_id = uuid();
        }
    }
}

export { Product };