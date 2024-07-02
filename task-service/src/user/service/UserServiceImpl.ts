import { Repository } from "typeorm";
import { UserService } from "./UserService";
import { User } from "../models/User";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { UpdateUserRequest } from "../models/UpdateUserRequest";
import { RemoveUserRequest } from "../models/RemoveUserRequest";

export class UserServiceImpl implements UserService {

    private repository: Repository<User>

    constructor(repository: Repository<User>){
        this.repository = repository;
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.repository.find()
            return users;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async findById(id:number):Promise<User>{
        try {
            const user = await this.repository.findOneBy({id: id});
            if(user != null){
                return user;
            }else{
                return Promise.reject("user not found");
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findByFirstName(firstname:string):Promise<User[]>{
        try {
            const users = await this.repository.findBy({firstname: firstname});
            return users;
        } catch (error) {
            return Promise.reject(error);
        }  
    }

    async findBySurName(surname:string):Promise<User[]>{
        try {
            const users = await this.repository.findBy({surname: surname});
            return users;
        } catch (error) {
            return Promise.reject(error);
        }  
    }

    async findByRole(role:string):Promise<User[]>{
        try {
            const users = await this.repository.findBy({role: role});
            return users;
        } catch (error) {
            return Promise.reject(error);
        }  
    }
    
    async create(request:CreateUserRequest):Promise<User>{
        try {
            const user = new User(
                request.email,
                request.firstname,
                request.surname,
                request.role
            )
            return this.repository.save(user);
        } catch (error) {
            return Promise.reject(error);
        }  
    }

    async update(request:UpdateUserRequest):Promise<User> {
        try {
            let user = await this.findById(request.id);
            
            user.email = request.email;
            user.firstname = request.firstname;
            user.surname = request.surname;
            user.role = request.role;

            return this.repository.save(user);
        } catch (error) {
            return Promise.reject(error);
        }  
    }

    async remove(request:RemoveUserRequest):Promise<User>{
        try {
            const user = await this.findById(request.id);
            
            return this.repository.remove(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}