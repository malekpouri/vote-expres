import {
  ForbiddenError,
  NotfoundError,
  httpError,
} from "../../errors/http-error";
import { User } from "../../model/entity";
import { CreatePlanDto } from "./dto/create-plan-dto";
import { Plan } from "./model/plan";
import { PlanRepository } from "./plan.repository";
import { CreateProgramDto } from "./program/dto/create-program-dto";

export class PlanService {
  private planRepository: PlanRepository;
  constructor() {
    this.planRepository = new PlanRepository();
  }

  getPlanByID(id: number) {
    const plan = this.planRepository.findById(id);

    if (!plan || typeof plan === "undefined") {
      throw new httpError("Plan not found", 404);
    }
    return plan;
  }
  createPlan = (dto: CreatePlanDto) => {
    const newPlan = {
      title: dto.title,
      description: dto.description || "",
      deadline: dto.deadline,
      programs: [],
    };
    if (dto.deadline < new Date()) {
      throw new httpError("deadline not valid", 400);
    }
    // plans.push(newPlan);
    return this.planRepository.create(newPlan);
  };
  createProgram = async (
    dto: CreateProgramDto,
    loggedUser: User
  ): Promise<Plan> => {
    const plan = await this.planRepository.findById(dto.planId);
    if (!plan || plan === undefined) {
      throw new NotfoundError();
    }
    if (this.canCreateProgram(loggedUser, plan)) {
      this.planRepository.addProgram(plan, {
        title: dto.title,
        description: dto.description || "",
        deadline: dto.deadline,
        userId: loggedUser.id,
      });
      return plan;
    } else {
      throw new httpError("you can not create program", 400);
    }
  };
  canCreateProgram = (user: User, plan: Plan): boolean => {
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
}
