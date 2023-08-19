import { NextFunction, Request ,Response } from "express"
import { userService } from "./dependecy";

export const loginMidalware=async (req:Request,res:Response,next:NextFunction)=>{
    const userId = req.headers.authorization;
    if (!userId || userId === undefined) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    const loggedUser = await userService.findById(userId);
    console.log("this is logged user: ", loggedUser);
    
    if (!loggedUser || loggedUser === undefined) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    req.user = loggedUser;
    next();
}