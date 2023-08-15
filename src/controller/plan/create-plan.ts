import { httpError } from "../../errors/http-error";
import { Plan } from "../../model/entity";
import { plans } from "../../routers/plan.route";
export const createPlan=(dto:{title:string,description?:string,deadline:Date}):Plan => {
    const newPlan: Plan = {
        id: plans.length + 1,
        title:dto.title,
        description: dto.description || "",
        deadline: dto.deadline,
    };
    if(dto.deadline < new Date()){
        throw new httpError("deadline not valid",400)
    }
    plans.push(newPlan);
    return newPlan
}