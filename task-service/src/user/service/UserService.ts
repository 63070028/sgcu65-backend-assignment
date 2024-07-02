import { CreateUserRequest } from "../models/CreateUserRequest"
import { RemoveUserRequest } from "../models/RemoveUserRequest"
import { UpdateUserRequest } from "../models/UpdateUserRequest"
import { User } from "../models/User"

export interface UserService {
    findAll(): Promise<User[]>
    
    findById(id:number):Promise<User>

    findByFirstName(firstname:string):Promise<User[]>

    findBySurName(surname:string):Promise<User[]>

    findByRole(role:string):Promise<User[]>
    
    create(request:CreateUserRequest):Promise<User>

    update(request:UpdateUserRequest):Promise<User>

    remove(request:RemoveUserRequest):Promise<User>
}