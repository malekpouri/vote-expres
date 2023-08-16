import { log } from "console";
import {
  ForbiddenError,
  NotfoundError,
  httpError,
} from "../../errors/http-error";
import { Plan, Program, User } from "../../model/entity";
import { plans } from "../../routers/plan.route";
import { programs } from "../../routers/program.route";
import { CreateProgramDto } from "./dto/create-program-dto";

export const createProgram = (dto: CreateProgramDto, loggedUser: User) => {
  const plan = plans.find((plan) => plan.id === dto.planId);
  if (!plan || plan === undefined) {
    throw new NotfoundError();
  }
  if (canCreateProgram(loggedUser, plan)) {
    const program: Program = {
      id: programs.length + 1,
      title: dto.title,
      description: dto.description || "",
      deadline: dto.deadline,
      planId: plan.id,
      userId: loggedUser.id,
    };
    plan.programs.push(program);
    return program;
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
