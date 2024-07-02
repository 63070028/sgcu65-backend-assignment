import { User } from "../../user/model/User"


export interface CreateTaskRequest{
    name:string
    content:string
    status:string
    deadline:string
    users?: User[]
}