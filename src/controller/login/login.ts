import { httpError } from "../../errors/http-error"
import { User } from "../../model/entity"
import { userService } from "../../utility/dependecy"


export const login=async (dto:{username:string,password:string})=>{

    const user=await userService.login(dto)
    if(!user || user === undefined){                
        throw new httpError("User not found",401)
    }  

    return user;
}