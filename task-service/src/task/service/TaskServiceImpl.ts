import { Repository } from "typeorm";
import { Task } from "../models/Task";
import { TaskService } from "./TaskService";
import { CreateTaskRequest } from "../models/CreateTaskRequest";
import { UpdateTaskRequest } from "../models/UpdateTaskRequest";
import { RemoveTaskRequest } from "../models/RemoveTaskRequest";


export class TaskServiceImpl implements TaskService{

    private repository: Repository<Task>

    constructor(repository:Repository<Task>){
        this.repository = repository;
    }

    async findAll(): Promise<Task[]>{
        let tasks = await this.repository.find();
        return tasks;
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

    async create(request:CreateTaskRequest):Promise<Task>{
        const task = new Task(
            request.name,
            request.content,
            request.status,
            request.deadline,
            request.users
        )
        return this.repository.save(task);
    }

    async update(request:UpdateTaskRequest):Promise<Task>{
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

    async remove(request:RemoveTaskRequest):Promise<Task>{
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