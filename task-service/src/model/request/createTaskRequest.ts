import { User } from "../../entity/User"

export interface createTaskRequest{
    name:string
    content:string
    status:string
    deadline:string
    users?: User[]
}