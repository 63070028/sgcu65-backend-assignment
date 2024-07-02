import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/model/User";

@Entity("tasks")
export class Task{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name:string
    @Column()
    content:string
    @Column()
    status:string
    @Column()
    deadline:string

    @ManyToMany(() => User, (user) => user.tasks)
    users?: User[]

    constructor(name:string, contend:string, status:string, deadline:string, users?:User[]){
        this.name = name;
        this.content = contend;
        this.status = status;
        this.deadline = deadline;
        this.users = users
    }


}