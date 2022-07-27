import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Collaborator } from "./Collaborators";

@Entity("collaborator_logs")
class CollaboratorsLogs {

    @PrimaryColumn()
    clog_id: string;

    @JoinColumn({ name: "clog_col_id" })
    @ManyToOne(() => Collaborator)
    collaborators: Collaborator;

    @Column()
    clog_col_id: string;

    @Column()
    clog_old_col_function: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.clog_id) {
            this.clog_id = uuid();
        }
    }
}

export { CollaboratorsLogs };