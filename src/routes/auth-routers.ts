import {Request, Response, Router} from "express";
import {LoginInputModel, LoginSuccessViewModel} from "../types/types";
import {usersService} from "../domian/users.service";
import {jwtService} from "../applications/jwt-service";

export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const {login, password}: LoginInputModel = req.body
        const user = await usersService.checkCredentials({login, password})
        if(user){
            const token = await jwtService.createJWT(user)
            res.status(200).json({token})
            return
        }
        res.status(401).send('Unauthorized')
    })
