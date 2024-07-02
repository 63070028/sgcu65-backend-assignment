import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("tasks")
@Unique(["name", "userId"])
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
    @Column()
    userId:number



    constructor(name:string, contend:string, status:string, deadline:string, userId:number){
        this.name = name;
        this.content = contend;
        this.status = status;
        this.deadline = deadline;
        this.userId = userId;
    }


}