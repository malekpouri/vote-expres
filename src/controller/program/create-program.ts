import { ForbiddenError, NotfoundError } from "../../errors/http-error";
import { Plan, Program, User } from "../../model/entity";
import { users } from "../../routers/login.route";
import { plans } from "../../routers/plan.route";
import { programs } from "../../routers/program.route";

export const createProgram = (
  dto: {
    title: string;
    description?: string;
    deadline: Date;
    planId: number;
    userId: string;
  },
  loggedUser?: User
) => {
  const plan = plans.find((plan) => plan.id === dto.planId);
  if (!plan || plan === undefined) {
    throw new NotfoundError();
  }
  const user = users.find((user) => user.id === dto.userId);
  if (canCreateProgram(user, plan)) {
    const newProgram: Program = {
      id: programs.length + 1,
      title: dto.title,
      description: dto.description || "",
      deadline: dto.deadline,
      planId: dto.planId,
      userId: dto.userId,
    };
    programs.push(newProgram);
    return newProgram;
  }
};

export const canCreateProgram = (loggedUser: User, plan: Plan): boolean => {
  if (!loggedUser || loggedUser.role !== "Representative") {
    throw new ForbiddenError();
  }
  const program = programs.find((program) => program.planId === plan.id);
  if (program) {
    throw new NotfoundError();
  }
  return true;
};
