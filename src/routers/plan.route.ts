import { Router } from "express";
import { z } from "zod";
import { createPlanDto } from "../controller/plan/dto/create-plan-dto";
import { Plan } from "../controller/plan/model/plan";
import { createProgramDto } from "../controller/plan/program/dto/create-program-dto";
import { handleExpress } from "../utility/handleExpress";
import { loginMidalware } from "../utility/login.midalware";
import { planService, userService } from "../utility/dependecy";
export const router = Router();

export const plans: Plan[] = [];

router.post("/plan",loginMidalware, (req, res, next) => {
 
  if (req.user.role !== "Admin") {
    res.status(403).send({ message: "forbidden" });
    return;
  }
    const dto = createPlanDto.parse(req.body);
    const plan = planService.createPlan(dto);
    return res.status(200).send(plan);


});
router.post("/plan/:id/program",loginMidalware, (req, res, next) => {
    const dto = createProgramDto.parse({...req.body,planId:z.coerce.number().parse(req.params.id)});
    handleExpress(res, () => planService.createProgram(dto, req.user));
});
router.get("/plan/:id", (req, res, next) => {
    const userId = req.headers.authorization;
    if (!userId) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    const loggedUsers = userService.findById(userId)
    if (!loggedUsers) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
      const id = z.coerce.number().parse(req.params.id);
      handleExpress(res, () => planService.getPlanByID(id));
  });