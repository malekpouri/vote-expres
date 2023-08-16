import { Router } from "express";
import { Program, User } from "../model/entity";
import { users } from "./login.route";
import { createProgramDto } from "../controller/program/dto/create-program-dto";
import { createProgram } from "../controller/program/create-program";
import { z } from "zod";
import { ForbiddenError } from "../errors/http-error";


export const router = Router();

export const programs: Program[] = [];

router.post("/", (req, res,next) => {
    const userId = req.headers.authorization;
    const loggedUser = users.find(user => user.id === userId);
    
    try{
        const dto=createProgramDto.parse(req.body);
        const program = createProgram(dto,loggedUser);
        res.status(201).send(program);
    }catch(err){
        if(err instanceof z.ZodError){
            res.status(400).send(err.message);
            return;
        }
    }


})