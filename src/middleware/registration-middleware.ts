import {body} from "express-validator";

export const emailValidationRegistration = body('email')
    .exists()
    .notEmpty()
    .isEmail()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
