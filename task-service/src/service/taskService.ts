import { Task } from "../entity/Task";
import { createTaskRequest } from "../model/request/createTaskRequest";
import { removeTaskRequest } from "../model/request/removeTaskRequest";
import { updateTaskRequest } from "../model/request/updateTaskRequest";

export interface taskService{
    findAll(): Promise<Task[]>
    
    findById(id:number):Promise<Task>

    findByName(name:string):Promise<Task>

    create(request:createTaskRequest):Promise<Task>

    update(request:updateTaskRequest):Promise<Task>

    remove(request:removeTaskRequest):Promise<Task>
}