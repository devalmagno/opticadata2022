import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("occupations")
class Occupation {

    @PrimaryColumn()
    id: string;

    @Column({ length: 20 })
    name: string;

    @Column()
    commission_percentege: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Occupation };