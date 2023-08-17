import { httpError } from "../../errors/http-error";
import { CreatePlanDto } from "./dto/create-plan-dto";
import { PlanRepository } from "./plan.repository";
export const createPlan=(dto:CreatePlanDto,planRepo:PlanRepository) => {
    const newPlan = {
        title:dto.title,
        description: dto.description || "",
        deadline: dto.deadline,
        programs: [],
    };
    if(dto.deadline < new Date()){
        throw new httpError("deadline not valid",400)
    }
    // plans.push(newPlan);
    return planRepo.create(newPlan);
}