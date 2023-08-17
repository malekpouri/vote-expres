import { httpError } from "../../errors/http-error";
import { Plan } from "./model/plan";
import { plans } from "../../routers/plan.route";
import { PlanRepository } from "./plan.repository";


export const getPlanById = (id: number,planRepo:PlanRepository):Plan => {
    const plan = planRepo.getById(id);

    if (!plan || typeof plan === "undefined") {
        throw new httpError("Plan not found",404);
    }
    return plan;
}