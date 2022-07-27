import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Collaborator } from "./Collaborators";

@Entity("users")
class User {

    @PrimaryColumn()
    user_id: string;

    @JoinColumn({ name: "user_col_id" })
    @ManyToOne(() => Collaborator)
    collaborators: Collaborator;

    @Column()
    user_col_id: string;

    @Column()
    user_password: string;

    @Column()
    user_is_admin: boolean;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.user_id) {
            this.user_id = uuid();
        }
    }
}

export { User };