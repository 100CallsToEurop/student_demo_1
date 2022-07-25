import {UserAccount, UserInputModel} from "../types/user.type";
import {emailAdapter} from "../adapters/email-adapter";


export const emailManager = {
    async sendEmailConfirmationMessage(registrationParams: UserAccount){
        const link = `https://some-front.com/confirm-registration?code=${registrationParams.emailConfirmation.confirmationCode}`
        await emailAdapter.sendEmail(registrationParams.accountData.email, "registration user", link)
    }
}

