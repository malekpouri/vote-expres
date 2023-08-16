import { z } from "zod";


export const createProgramDto=z.object({
    title:z.string().nonempty(),
    description: z.string().optional(),
    deadline: z.coerce.date().refine((val)=>val.getTime()>Date.now(),"deadline must be in the future"),    
    planId: z.number(),
    userId: z.string().nonempty(),
})

export type CreateProgramDto=z.infer<typeof createProgramDto>