import {usersRepository} from "../repositories/users-repository-db";
import {UserAccount} from "../types/user.type";

export const authService = {
    async findUserForConfirm(code: string){
        const user = await usersRepository.findByConfirmCode(code)
        if(!user) return false
        return await this.confirmEmail(user, user.emailConfirmation.confirmationCode)
    },

    async findUserByEmail(email: string){
        const user = await usersRepository.findUserByEmail(email)
        if(!user) return false
        console.log(1)
        return await this.confirmEmail(user, user.emailConfirmation.confirmationCode)
    },

   async confirmEmail(user:UserAccount, code: string){
       if(user.emailConfirmation.confirmationCode) return false
       console.log(2)
       if(user.emailConfirmation.confirmationCode !== code) return false
       console.log(3)
       if(user.emailConfirmation.expirationDate < new Date()) return false
       console.log(4)

       const result = await usersRepository.updateConfirmationCode(user._id)
       return result
   },



}
