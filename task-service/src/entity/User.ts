import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    email:string
    @Column()
    firstname:string
    @Column()
    surname:string
    @Column()
    role:string

    constructor(id:number, email:string, firstname:string, surname:string, role:string){
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.role = role;
    }
}