import {Request, Response, Router} from "express";
import {usersService} from "../domian/users.service";
import {jwtService} from "../applications/jwt-service";
import {LoginInputModel} from "../types/login.type";
import {RegistrationConfirmationCodeModel, RegistrationEmailResending} from "../types/registration.type";
import {emailValidationRegistration} from "../middleware/registration-middleware";
import {UserInputModel} from "../types/user.type";
import {authService} from "../domian/auth.service";
import {loginValidation, passwordValidation} from "../middleware/user-middleware";
import {checkLimitReq} from "../middleware/checkLimitRequest-middleware";
import {inputValidatorMiddleware} from "../middleware/input-validator-middleware";

export const authRouter = Router({})

authRouter.post('/login', checkLimitReq,
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

authRouter.post('/registration-confirmation', checkLimitReq,
    async (req: Request, res: Response) => {
        const {code}: RegistrationConfirmationCodeModel = req.body
        const result = await authService.findUserForConfirm(code)
        if(result) {
            res.status(204).send('Email was verified. Account was activated')
            return
        }
        res.status(400).send(400)
    })

authRouter.post('/registration',
    loginValidation,
    emailValidationRegistration,
    passwordValidation,
    inputValidatorMiddleware,
    checkLimitReq,
    async (req: Request, res: Response) => {
       const {login, email, password}: UserInputModel = req.body
       const user = await usersService.createUser({login, email, password})
        if(user){
            res.status(204).send(204)
            return
        }
        res.status(400).send('Bad request')
    })

authRouter.post('/registration-email-resending',
    emailValidationRegistration,
    inputValidatorMiddleware,
    checkLimitReq,
    async (req: Request, res: Response) => {
        const {email}: RegistrationEmailResending = req.body
        const result = await authService.findUserForConfirm(email)
        if(result){
            res.status(204).send(204)
            return
        }
        else{
            res.status(400).send('Bad request')
            return
        }

    })