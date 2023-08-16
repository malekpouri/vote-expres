import request from "supertest";
import { app } from "../src/api";
import { createPlanTest, loginUserTest } from "./utility";

describe("Plan", () => {
    
  describe("create plan", () => {
    it("should be faild if did not logged in", async () => {
      await request(app).post("/plan").expect(401);
    });
    it("shuld be pass if logged in", async () => {
      const userResponse:any =await loginUserTest("admin","admin");
      const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const planTest=await createPlanTest(userResponse,"Bandar Abbas",200,tomarow)
        expect(planTest.body.title).toBe("Bandar Abbas");
    });
    it("should be faild if title is empty", async () => {
        const userResponse:any =await loginUserTest("admin","admin");
        await createPlanTest(userResponse,"",400,new Date())        
        });
    it("should be faild if title is not string", async () => {
        const userResponse:any =await loginUserTest("admin","admin");
        await createPlanTest(userResponse,123,400,new Date())
        }
    );
    it("should be faild if user role is not Admin", async () => {
        const userResponse:any =await loginUserTest("user","usder");
        userResponse.role="User"    
        await createPlanTest(userResponse,"Bandar Abbas",403,new Date())   
        }
    );

    it("should be faild if title is less and equal than 1 character", async () => {
        const userResponse:any =await loginUserTest("admin","admin");
        await createPlanTest(userResponse,"a",400,new Date())
        }
    );
  });
    describe("get plan", () => {
        it("should be faild if did not logged in", async () => {
            await request(app).get("/plan/1").expect(401);
        });
        it("should be faild if id is not number", async () => {
            const userResponse:any =await loginUserTest("admin","admin");
            await request(app)
                .get("/plan/a")
                .set("Authorization", userResponse.id)
                .expect(400);
        });    
        it("should be faild if id is not exist", async () => {
            const userResponse:any =await loginUserTest("admin","admin");
            await request(app)
                .get("/plan/100")
                .set("Authorization", userResponse.id)
                .expect(404);
        });
        it("should be pass if id is exist", async () => {
            const title="Bandar Abbas"
            const userResponse:any =await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const planTest=await createPlanTest(userResponse,title,200,tomarow)
            const plan = await request(app)
                .get(`/plan/${planTest.body.id}`)
                .set("Authorization", userResponse.id)
                .expect(200);
            expect(plan.body.title).toBe(title);
        }
        );
        it("should be faild if deadline is empety", async () => {
            const userResponse:any =await loginUserTest("admin","admin");
            await request(app)
                .post("/plan")
                .set("Authorization", userResponse.id)
                .send({
                    title: "Bandar Abbas",
                    description: "trip free to Bandar Abbas",
                    deadline: ""
                })
                .expect(400);
        }
        );
    }
    );
});
