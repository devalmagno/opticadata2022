import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("provider")
class Provider {

    @PrimaryColumn()
    prov_id: string;

    @Column()
    prov_cnpj: string;

    @Column()
    prov_desc: string;

    @Column()
    prov_email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.prov_id) {
            this.prov_id = uuid();
        }
    }
}

export { Provider };