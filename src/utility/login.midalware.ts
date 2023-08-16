import { NextFunction, Request ,Response } from "express"
import { users } from "../routers/login.route";

export const loginMidalware= (req:Request,res:Response,next:NextFunction)=>{
    const userId = req.headers.authorization;
    const loggedUser = users.find((user) => user.id === userId);
    if (!loggedUser || loggedUser === undefined) {
      res.status(401).send({ message: "unauthorized" });
      return;
    }
    req.user = loggedUser;
    next();
}