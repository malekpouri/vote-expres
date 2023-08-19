import { Router } from "express";
import { z } from "zod";
import { loginDto } from "../controller/login/dto/login-dto";
import { userService } from "../utility/dependecy";
import { handleExpress } from "../utility/handleExpress";

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
