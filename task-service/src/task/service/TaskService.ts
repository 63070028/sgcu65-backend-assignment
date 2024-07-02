import { Task } from "../models/Task"
import { RemoveTaskRequest } from "../models/RemoveTaskRequest"
import { UpdateTaskRequest } from "../models/UpdateTaskRequest"
import { CreateTaskRequest } from "../models/CreateTaskRequest"




export interface TaskService{
    findAll(): Promise<Task[]>
    
    findById(id:number):Promise<Task>

    findByName(name:string):Promise<Task[]>

    create(request:CreateTaskRequest):Promise<Task>

    update(request:UpdateTaskRequest):Promise<Task>

    remove(request:RemoveTaskRequest):Promise<Task>
}