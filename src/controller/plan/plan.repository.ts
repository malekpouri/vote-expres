import { Program } from "./program/model/program";
import { Plan } from "./model/plan";

export interface CreatePlan {
  title: string;
  description: string;
  deadline: Date;
  programs: Program[];
}

export interface CreateProgram{
    title: string;
    description: string;
    deadline: Date;
    userId: string;
}

export class PlanRepository {
  private plans: Plan[] = [];

  private getNextId(): number {
    return this.plans.length + 1;
  }
  public create(plan: CreatePlan) {
    const createPlan={...plan,id:this.getNextId()}
    this.plans.push(createPlan);
    return createPlan;
  }

  public getById(id: number) {
    const plan = this.plans.find((plan) => plan.id === id);

    return plan;
  }

  public addProgram(plan:Plan, program: CreateProgram) {
    plan.programs.push({
        id: plan.programs.length + 1,
        title: program.title,
        description: program.description,
        deadline: program.deadline,
        planId: plan.id,
        userId: program.userId,
    })
  }

}
