import { User } from "../../user/models/User"


export interface CreateTaskRequest{
    name:string
    content:string
    status:string
    deadline:string
    users?: User[]
}