import request from "supertest";
import { app } from "../src/api";
import { createPlanTest, loginUserTest } from "./utility";
import { PlanService } from "../src/controller/plan/plan.service";
import { after, before } from "node:test";
import { AppDataSource } from "../src/utility/data-source";

describe.skip("Program", () => {
  beforeAll(async () => {
    AppDataSource.initialize();
  });
  afterAll(async () => {
    AppDataSource.destroy();
  });
  describe("create program", () => {
    it("should be faild if did not logged in", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      await request(app).post(`/plan/${plan.body.id}/program`).expect(401);
    });
    it("should be success if logged in", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      const program = await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "Bandar Abbas",
          description: "trip free to Bandar Abbas",
          deadline: new Date().setDate(new Date().getDate() + 1),
          userId: repResponse.id,
        })
        .expect(200);
      expect(program.body.title).toBe("Bandar Abbas");
    });

    it("should be faild if title is empty", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );

      await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "",
          description: "trip free to Bandar Abbas",
          deadline: new Date().setDate(new Date().getDate() + 1),
        })
        .expect(400);
    });
    it("should be faild if deadline is empty", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "Bandar Abbas",
          description: "trip free to Bandar Abbas",
          deadline: "",
        })
        .expect(400);
    });
    it("should be faild if deadline is undefined", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "Bandar Abbas",
          description: "trip free to Bandar Abbas",
          deadline: undefined,
        })
        .expect(400);
    });
    it("should be faild if deadline is null", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "Bandar Abbas",
          description:
            "trip free to Bandar Abbas should be faild if deadline is null",
          deadline: null,
        })
        .expect(400);
    });
    it("should be success if deadline is valid", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      const program = await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: "Bandar Abbas",
          description:
            "trip free to Bandar Abbas should be success if deadline is valid",
          deadline: tomarow,
          userId: repResponse.id,
        })
        .expect(200);
      expect(program.body.title).toBe("Bandar Abbas");
    });
    it("should be faild if deadline is exeeded", async () => {
      const repResponse: any = await loginUserTest("rep", "rep");
      const adminResponse: any = await loginUserTest("admin", "admin");
      const todate = new Date();
      const tomarow = new Date(todate.setDate(todate.getDate() + 1));
      const yesterday = new Date(todate.setDate(todate.getDate() - 1));
      const plan = await createPlanTest(
        adminResponse,
        "Bandar Abbas",
        200,
        tomarow
      );
      await request(app)
        .post(`/plan/${plan.body.id}/program`)
        .set("Authorization", repResponse.id)
        .send({
          title: plan.body.title,
          description: plan.body.description,
          deadline: yesterday,
        })
        .expect(400);
    });
    it("should not create program if user already have a a program", async () => {
      const planSerrvice = new PlanService();
      expect(
        planSerrvice.canCreateProgram(
          {
            id: "1",
            username: "rep",
            password: "rep",
            role: "Representative",
          },
          {
            id: 1,
            title: "title",
            description: "description",
            deadline: new Date(),
            programs: [
              {
                id: 1,
                title: "title",
                description: "description",
                deadline: new Date(),
                userId: "1",
              },
            ],
          }
        )
      ).toBe(false);
    });
  });
});
function canCreateProgram(
  arg0: { id: string; username: string; password: string; role: string },
  arg1: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    programs: {
      id: number;
      title: string;
      description: string;
      deadline: Date;
      userId: string;
    }[];
  }
): any {
  throw new Error("Function not implemented.");
}
