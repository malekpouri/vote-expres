import { Response } from "express"
import { httpError } from "../errors/http-error"

export const handleExpress=<A>(res:Response,fn:()=>A)=>{
    try{
        const result = fn()
        res.status(200).send(result)
    }catch(err){
        if(err instanceof httpError){
            res.status(err.statusCode).send(err.message)
        }
    }
    res.status(500).send("something went wrong");
}
