import { Router } from "express";
import { z } from "zod";
import { createProgram } from "../controller/program/create-program";
import { createProgramDto } from "../controller/program/dto/create-program-dto";
import { Program } from "../model/entity";
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
