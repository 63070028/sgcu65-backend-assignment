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
        try {
            let tasks = await this.repository.find();
            return tasks;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async findById(id:number):Promise<Task>{
        try {
            const task = await this.repository.findOneBy({id: id});
            if(task != null){
                return task;
            }else{
                return Promise.reject("task not found");
            }
        } catch (error) {
            return Promise.reject(error);
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
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async create(request:CreateTaskRequest):Promise<Task>{
        try {
            const task = new Task(
            request.name,
            request.content,
            request.status,
            request.deadline,
            request.users);
            
            return this.repository.save(task);
        } catch (error) {
            return Promise.reject(error);
        } 
    }

    async update(request:UpdateTaskRequest):Promise<Task>{
        try {
            let task = await this.findById(request.id);

            task.name = request.name;
            task.content = request.content;
            task.status = request.status;
            task.deadline = request.deadline;

            return this.repository.save(task);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async remove(request:RemoveTaskRequest):Promise<Task>{
        try {
            const task = await this.findById(request.id);
            return this.repository.remove(task);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}