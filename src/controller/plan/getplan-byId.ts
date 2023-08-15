import { httpError } from "../../errors/http-error";
import { Plan } from "../../model/entity";
import { plans } from "../../routers/plan.route";


export const getPlanById = (id: number):Plan => {
    const plan = plans.find((plan) => plan.id === id);

    if (!plan || typeof plan === "undefined") {
        throw new httpError("Plan not found",404);
    }
    return plan;
}