import { User } from "../../entity/User"

export interface updateTaskRequest{
    id:number
    name:string
    content:string
    status:string
    deadline:string
}