import { Program } from "../../model/entity";
import { programs } from "../../routers/program.route";


export const createProgram =(dto:{title:string,description?:string,deadline:Date,planId:number})=>{
    const newProgram: Program = {
        id: programs.length + 1,
        title:dto.title,
        description: dto.description || "",
        deadline: dto.deadline,
        planId: dto.planId,
    };
    programs.push(newProgram);
    return newProgram;
}