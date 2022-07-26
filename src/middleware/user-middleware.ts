import {body, CustomValidator} from "express-validator";
import {usersRepository} from "../repositories/users-repository-db";


export const emailValidationEmail = body('email')
    .exists()
    .notEmpty()
    .isEmail()




