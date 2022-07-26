import {body} from "express-validator";

export const emailValidationRegistration = body('email')
    .exists()
    .notEmpty()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
