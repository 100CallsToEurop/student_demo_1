import {body} from "express-validator";


export const emailValidationEmail = body('email')
    .exists()
    .notEmpty()
    .isEmail()




