import { v4 } from "uuid";
import { UserEntity } from "../controller/login/entity/user.entity"
import { AppDataSource } from "./data-source"

export const seedUser =async ()=>{
    const userRepo = AppDataSource.getRepository(UserEntity);
    const count = await userRepo.count();
    if(count === 0){
        await userRepo.save([ 
        { id: v4(), username: "admin", password: "admin", role: "Admin" },
        { id: v4(), username: "user", password: "user", role: "User" },
        { id: v4(), username: "rep", password: "rep", role: "Representative" },
    ])
    }
}