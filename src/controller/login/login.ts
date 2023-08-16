import { httpError } from "../../errors/http-error"
import { User } from "../../model/entity"
import { users } from "../../routers/login.route"


export const login=(dto:{username:string,password:string}):User=>{

    const user= users.find(user=>user.username===dto.username && user.password===dto.password)
    if(!user || user === undefined){                
        throw new httpError("User not found",401)
    }  

    return user;
}