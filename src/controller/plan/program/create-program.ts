import {
  ForbiddenError,
  NotfoundError,
  httpError,
} from "../../../errors/http-error";
import { User } from "../../../model/entity";
import { Plan } from "../../plan/model/plan";
import { PlanRepository } from "../../plan/plan.repository";
import { CreateProgramDto } from "./dto/create-program-dto";
import { Program } from "./model/program";

export const createProgram = (
  dto: CreateProgramDto,
  loggedUser: User,
  planRepo: PlanRepository
) :Program => {
  const plan = planRepo.getById(dto.planId);
  if (!plan || plan === undefined) {
    throw new NotfoundError();
  }
  if (canCreateProgram(loggedUser, plan)) {
    planRepo.addProgram(plan, {
      title: dto.title,
      description: dto.description || "",
      deadline: dto.deadline,
      userId: loggedUser.id,
    });
    return plan.programs[plan.programs.length - 1];
  } else {
    throw new httpError("you can not create program", 400);
  }
};

export const canCreateProgram = (user: User, plan: Plan): boolean => {
  if (!user || user.role !== "Representative") {
    throw new ForbiddenError();
  }
  const program = plan.programs.find((program) => program.userId === user.id);
  if (program) {
    return false;
  }
  if (plan.deadline.getTime() < new Date().getTime()) {
    return false;
  }
  return true;
};
