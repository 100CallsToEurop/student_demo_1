import {body} from "express-validator";

export const loginValidation = body('login')
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 10})
    .withMessage('Max 10 symbols')

export const passwordValidation = body('password')
    .exists()
    .notEmpty()
    .isLength({min: 6, max: 20})
    .withMessage('Max 20 symbols')