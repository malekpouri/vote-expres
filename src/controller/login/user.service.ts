import { httpError } from "../../errors/http-error";
import { User } from "../../model/entity";
import { LoginDto } from "./dto/login-dto";
import { UserRepository } from "./user.repository";

export class UserSrevice{

    private userRepo: UserRepository
    constructor(){
    this.userRepo = new UserRepository()
    }
    async login({username,password}:LoginDto):Promise<User>{
        const user = await this.userRepo.findByUserName(username);
        if(!user || user === undefined){                
            throw new httpError("User not found",401)
        }
        if(user.password !== password){
            throw new httpError("Password not match",401)
        }
        return user;    
    }
    findById(id: string){
        return this.userRepo.findById(id);
    }
    
}