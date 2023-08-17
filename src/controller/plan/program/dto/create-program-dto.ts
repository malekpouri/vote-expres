import { z } from "zod";


export const createProgramDto=z.object({
    title:z.string().nonempty(),
    description: z.string().optional(),
    deadline: z.coerce.date(),    
    planId: z.number(),
    userId: z.string().nonempty(),
})

export type CreateProgramDto=z.infer<typeof createProgramDto>