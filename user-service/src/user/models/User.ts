import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


    constructor(email:string, firstname:string, surname:string, role:string){
        this.email = email;
        this.firstname = firstname;
        this.surname = surname;
        this.role = role;
    }
}