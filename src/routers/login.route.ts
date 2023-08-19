import { Router } from "express";
import { v4 } from "uuid";
import { z } from "zod";
import { loginDto } from "../controller/login/dto/login-dto";
import { login } from "../controller/login/login";
import { User } from "../model/entity";
import { handleExpress } from "../utility/handleExpress";
import { userService } from "../utility/dependecy";

export const router = Router();



router.post("/login", (req, res) => {
 
  try{
    const dto = loginDto.parse(req.body)
    handleExpress(res,()=> userService.login(dto));
  }catch(err){
    if (err instanceof z.ZodError)
      res.status(401).send({ message: err.message });
  }
});
