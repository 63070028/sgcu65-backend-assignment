import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../task/models/Task";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    email:string
    @Column()
    firstname:string
    @Column()
    surname:string
    @Column()
    role:string

    @ManyToMany(() => Task, (task) => task.users)
    @JoinTable()
    tasks?: Task[]


    constructor(email:string, firstname:string, surname:string, role:string, tasks?: Task[]){
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.role = role;
        this.tasks = tasks;
    }
}