import request from "supertest";
import { app } from "../src/api";

describe("User", () => {
  describe("login", () => {
    it("should be faild if user is empty", async () => {
      await request(app)
        .post("/login")
        .send({ username: "", password: "123" })
        .expect(401);
    });
    it("should be faild if password is empty", async () => {
      await request(app)
        .post("/login")
        .send({ username: "admin", password: "" })
        .expect(401);
        
    });
    it("should be faild if user or password is not valid", async () => {
      await request(app)
        .post("/login")
        .send({ username: "admin", password: "123" })
        .expect(401);
    });
    it("should be pass if user and password is valid", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "admin", password: "admin" })
        .expect(200);
      expect(response.body.username).toBe("admin");
    });
  });
});
