import { Repository } from "typeorm";
import { Task } from "../entity/Task";
import { taskService } from "./taskService";
import { createTaskRequest } from "../model/request/createTaskRequest";
import { removeTaskRequest } from "../model/request/removeTaskRequest";
import { updateTaskRequest } from "../model/request/updateTaskRequest";

export class taskServiceImpl implements taskService{

    private repository: Repository<Task>

    constructor(repository:Repository<Task>){
        this.repository = repository;
    }

    findAll(): Promise<Task[]>{
        return this.repository.find();
    }
    
    async findById(id:number):Promise<Task>{
        try {
            const task = await this.repository.findOneBy({id: id});
            if(task != null){
                return task;
            }else{
                return Promise.reject("task not found");
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async findByName(name:string):Promise<Task>{
        try {
            const task = await this.repository.findOneBy({name: name});
            if(task != null){
                return task;
            }else{
                return Promise.reject("task not found");
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    create(request:createTaskRequest):Promise<Task>{
        const task = new Task(
            request.name,
            request.content,
            request.status,
            request.deadline,
            request.users
        )
        return this.repository.save(task);
    }

    async update(request:updateTaskRequest):Promise<Task>{
        try {
            const taskOld = await this.findById(request.id);
            if(taskOld != null){
                return this.repository.save(request);
            }else{
                return Promise.reject("task not found");
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async remove(request:removeTaskRequest):Promise<Task>{
        try {
            const taskOld = await this.findById(request.id);
            if(taskOld != null){
                return this.repository.remove(taskOld);
            }else{
                return Promise.reject("task not found");
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}