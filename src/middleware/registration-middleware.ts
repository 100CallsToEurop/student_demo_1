import {body} from "express-validator";

export const emailValidationRegistration = body('email')
    .exists()
    .notEmpty()
    .isEmail()
