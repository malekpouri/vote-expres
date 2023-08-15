import * as z from 'zod';

export const createPlanDto =z.object({
    title : z.string().min(2).nonempty(),
    description : z.string().optional(),
    deadline : z.coerce.date().refine((d)=>d.getTime() > Date.now(),"deadline should be in future"),
})

export type CreatePlanDto = z.infer<typeof createPlanDto>

