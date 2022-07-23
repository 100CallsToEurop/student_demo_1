import {Request, Response, NextFunction} from "express";
import {jwtService} from "../applications/jwt-service";
import {usersService} from "../domian/users.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(" ")[1]
    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.user = await usersService.findUserById(userId)
        next()
    }
    res.send(401)
}
