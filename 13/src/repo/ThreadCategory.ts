import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Thread} from "./Thread";
import {Auditable} from "./Auditable";

@Entity({ name: "ThreadCategories"})
export class ThreadCategory extends Auditable {
    @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
    id: string;

    @Column("varchar", {
        name: "Name",
        length: 20,
        unique: true,
        nullable: false,
    })
    name: string;

    @Column("varchar", {
        name: "Description",
        length: 150,
        nullable: true,
    })
    description: string;

    @OneToMany(() => Thread, thread => thread.category)
    threads: Thread[];
}