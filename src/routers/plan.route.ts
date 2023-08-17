import { Router } from "express";
import { users } from "./login.route";
import { createPlan } from "../controller/plan/create-plan";
import { createPlanDto } from "../controller/plan/dto/create-plan-dto";
import { z } from "zod";
import { handleExpress } from "../utility/handleExpress";
import { getPlanById } from "../controller/plan/getplan-byId";
import { loginMidalware } from "../utility/login.midalware";
import { Plan } from "../controller/plan/model/plan"
import { planrepository } from "../utility/dependecy";
import { app } from "../api";
import { createProgramDto } from "../controller/plan/program/dto/create-program-dto";
import { createProgram } from "../controller/plan/program/create-program";
export const router = Router();

export const plans: Plan[] = [];

router.post("/",loginMidalware, (req, res, next) => {
 
  if (req.user.role !== "Admin") {
    res.status(403).send({ message: "forbidden" });
    return;
  }
  try {
    const dto = createPlanDto.parse(req.body);
    const plan = createPlan(dto,planrepository);
    return res.status(200).send(plan);

  } catch (err) {
    if (err instanceof z.ZodError)
      res.status(400).send({ message: err.message });
    return;
  }

});
router.post("/:id/program",loginMidalware, (req, res, next) => {
  try {
    const dto = createProgramDto.parse({...req.body,planId:z.coerce.number().parse(req.params.id)});
    handleExpress(res, () => createProgram(dto, req.user,planrepository));

  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).send(err.message);
      return;
    }
  }
});
router.get("/:id", (req, res, next) => {
    const userId = req.headers.authorization;
    const loggedUsers = users.find((u) => u.id === userId);
    if (!loggedUsers) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    try {
      const id = z.coerce.number().parse(req.params.id);
      handleExpress(res, () => getPlanById(id,planrepository));
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).send({ message: err.issues[0].message });
        return;
      }
    }
  });