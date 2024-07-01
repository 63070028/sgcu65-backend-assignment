import { Task } from "../../models/entity/Task"
import { createTaskRequest } from "../../models/request/createTaskRequest"
import { removeTaskRequest } from "../../models/request/removeTaskRequest"
import { updateTaskRequest } from "../../models/request/updateTaskRequest"


export interface TaskService{
    findAll(): Promise<Task[]>
    
    findById(id:number):Promise<Task>

    findByName(name:string):Promise<Task>

    create(request:createTaskRequest):Promise<Task>

    update(request:updateTaskRequest):Promise<Task>

    remove(request:removeTaskRequest):Promise<Task>
}