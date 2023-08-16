import { users } from "../../routers/login.route"
import { User } from "../../model/entity"
import { httpError } from "../../errors/http-error"
import { LoginDto } from "./dto/login-dto"
import { log } from "console"


// export const login=(username:string,password:string):User=>{
export const login=(dto:{username:string,password:string}):User=>{

    const user= users.find(user=>user.username===dto.username && user.password===dto.password)
log('user : ',user)

    if(!user || user === undefined){                
        throw new httpError("User not found",401)
    }  

    return user;
}