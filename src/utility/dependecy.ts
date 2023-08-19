import { UserSrevice } from "../controller/login/user.service";
import { PlanService } from "../controller/plan/plan.service";


export const planService = new PlanService();
export const userService = new UserSrevice();