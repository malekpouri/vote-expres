import { Router } from "express";
import { v4 } from "uuid";
import { z } from "zod";
import { loginDto } from "../controller/login/dto/login-dto";
import { login } from "../controller/login/login";
import { User } from "../model/entity";
import { handleExpress } from "../utility/handleExpress";

export const router = Router();

export const users: User[] = [
  { id: v4(), username: "admin", password: "admin", role: "Admin" },
  { id: v4(), username: "user", password: "user", role: "User" },
  { id: v4(), username: "rep", password: "rep", role: "Representative" },
];

router.post("/login", (req, res) => {
 
  try{
    const dto = loginDto.parse(req.body)
    handleExpress(res,()=>login(dto));
  }catch(err){
    if (err instanceof z.ZodError)
      res.status(401).send({ message: err.message });
  }
});
