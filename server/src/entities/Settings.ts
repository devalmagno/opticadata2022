import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("settings")
class Settings {

    @PrimaryColumn()
    id: string;

    @Column()
    optics_name: string;

    @Column()
    optics_color: string;

    @Column()
    optics_unit: string;

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

export { Settings };  