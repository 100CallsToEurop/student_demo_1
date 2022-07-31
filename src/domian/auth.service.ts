import {usersRepository} from "../repositories/users-repository-db";
import {UserAccount} from "../types/user.type";
import {emailManager} from "../managers/registration-user";

export const authService = {
    async findUserForConfirm(code: string){
        const user = await usersRepository.findByConfirmCode(code)
        if(!user) return false
        return await this.confirmEmail(user, user.emailConfirmation.confirmationCode)
    },

    async findUserByEmail(email: string){
        const user = await usersRepository.findUserByEmail(email)
        if(!user) return false
        try{
            await emailManager.sendEmailConfirmationMessage(user)
        }catch(err){
            console.log(err)
            await usersRepository.deleteUserById(user._id)
            return null
        }
        return {
            id: user._id.toString(),
            login: user.accountData.userName,
        }

    },

   async confirmEmail(user:UserAccount, code: string){
       if(user.emailConfirmation.isConfirmed) return false
       if(user.emailConfirmation.confirmationCode !== code) return false
       if(user.emailConfirmation.expirationDate < new Date()) return false

       const result = await usersRepository.updateConfirmationCode(user._id)
       return result
   },



}
