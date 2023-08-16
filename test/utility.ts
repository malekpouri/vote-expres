import request from "supertest";
import { app } from "../src/api";
import { User } from "../src/model/entity";


export const loginUserTest = async (user:string,pass:string) => {
    const response = await request(app)
        .post("/login")
        .send({ username: user, password: user })
        .expect(200);
    return response.body;
}
export const createPlanTest = async (user: User,title:any,status:number,deadline:Date) => {
    const plan = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
            title: title,
            description: "trip free to Bandar Abbas",
            deadline: new Date(deadline)
        })
        .expect(status);
        return plan
}