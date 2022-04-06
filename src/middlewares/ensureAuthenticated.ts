import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub:string
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
 const Authtoken = request.headers.authorization;
 
 if(!Authtoken){
     return response.status(401).end()
 }
 const [, token] = Authtoken.split(" ")

 try{
     const {sub} = verify(token,"bc80b9249047191f780453d1e89ee4ac") as IPayLoad
     request.user_id= sub;
     return next()
 } catch(err){
    return response.status(401).end()
 }


}
