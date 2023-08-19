import dotenv from "dotenv-flow"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "../controller/login/entity/user.entity"
import { PlanEntity } from "../controller/plan/entity/plan.entity"
import { ProgramEntity } from "../controller/plan/program/entity/program.entity"

dotenv.config()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "vote_expres",
    entities: [UserEntity,ProgramEntity,PlanEntity],
    synchronize: true,
    logging: false,
})