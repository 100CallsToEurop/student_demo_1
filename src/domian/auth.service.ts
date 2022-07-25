import {RegistrationConfirmationCodeModel, RegistrationEmailResending} from "../types/registration.type";
import {usersRepository} from "../repositories/users-repository-db";
import {UserAccount} from "../types/user.type";

export const authService = {
    async findUserForConfirm(code: string){
        const user = await usersRepository.findByConfirmCode(code)
        if(!user) return false
        return await this.confirmEmail(user, user.emailConfirmation.confirmationCode)
    },

   async confirmEmail(user:UserAccount, code: string){

       if(user.emailConfirmation.confirmationCode) return false
       if(user.emailConfirmation.confirmationCode !== code) return false
       if(user.emailConfirmation.expirationDate < new Date()) return false

       const result = await usersRepository.updateConfirmationCode(user._id)
       return result
   },



}
