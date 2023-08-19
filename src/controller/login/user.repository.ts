import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AppDataSource } from "../../utility/data-source";
import { User } from "../../model/entity";


export class UserRepository{
    private userRepo: Repository<UserEntity>;
    constructor(){
        this.userRepo = AppDataSource.getRepository(UserEntity);
    }

    findByUserName(username: string):Promise<User | null>{
        return this.userRepo.findOneBy({username});
    }

    async findById(id: string):Promise<User | null>{
        const userByID=await this.userRepo.findOneBy({id});
        return userByID;
    }
}