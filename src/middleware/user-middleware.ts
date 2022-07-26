import {body, CustomValidator} from "express-validator";
import {usersRepository} from "../repositories/users-repository-db";

export const loginValidation = body('login')
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 10})
    .withMessage('Max 10 symbols')
    .custom(value => {
        return  usersRepository.checkUserEmailOrLogin(value).then(user => {
            if (user) {
                return Promise.reject('this login is already in use');
            }
        });
        })

export const passwordValidation = body('password')
    .exists()
    .notEmpty()
    .isLength({min: 6, max: 20})
    .withMessage('Max 20 symbols')



