import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";
import {Thread} from "./Thread";
import {ThreadPoint} from "./ThreadPoints";
import {ThreadItemPoint} from "./ThreadItemPoint";
import {Auditable} from "./Auditable";
import {ThreadItem} from "./ThreadItem";


@Entity({ name: "Users" })
export class User extends Auditable {
    @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
    id: string;

    @Column("varchar", {
        name: "Email",
        length: 120,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column("varchar", {
        name: "UserName",
        length: 60,
        unique: true,
        nullable: false,
    })
    userName: string;

    @Column("varchar", {name: "Password", length: 100, nullable: false })
    @Length(8, 124)
    password: string;

    @Column("boolean", { name: "Confirmed", default: false, nullable: false })
    confirmed: boolean;

    @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
    isDisabled: boolean;

    @OneToMany(() => Thread, (thread) => thread.user)
    threads: Thread[];

    @OneToMany(() => ThreadPoint, (threadPoint) => threadPoint.thread)
    threadPoints: ThreadPoint[];

    @OneToMany(() => ThreadItemPoint, (threadItemPoint) =>threadItemPoint.user)
    threadItemPoints: ThreadItemPoint[];

    @OneToMany(() => ThreadItem, (threadItem) => threadItem.user)
    threadItems: ThreadItem[];
}