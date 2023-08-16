import { Router } from "express";
import { Program, User } from "../model/entity";
import { users } from "./login.route";
import { createProgramDto } from "../controller/program/dto/create-program-dto";
import { createProgram } from "../controller/program/create-program";
import { z } from "zod";
import { ForbiddenError } from "../errors/http-error";
import { log } from "console";
import { handleExpress } from "../utility/handleExpress";
import { loginMidalware } from "../utility/login.midalware";

export const router = Router();

export const programs: Program[] = [];

router.post("/",loginMidalware, (req, res, next) => {
  
  try {
    const dto = createProgramDto.parse(req.body);
    handleExpress(res, () => createProgram(dto, req.user));

  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).send(err.message);
      return;
    }
  }
});
