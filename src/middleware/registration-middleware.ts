import {body} from "express-validator";
import {usersRepository} from "../repositories/users-repository-db";

export const emailValidationRegistration = body('email')
    .exists()
    .notEmpty()
    .isEmail()
    .custom(value => {
        return  usersRepository.checkUserEmailOrLogin(value).then(user => {
            if (user) {
                return Promise.reject('this email is already in use');
            }
        });
    })
