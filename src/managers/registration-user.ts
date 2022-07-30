import {UserAccount, UserInputModel} from "../types/user.type";
import {emailAdapter} from "../adapters/email-adapter";


export const emailManager = {
    async sendEmailConfirmationMessage(registrationParams: UserAccount){
        const link = `To verify your email, go to <a href="https://student-demo-5.herokuapp.com/auth/registration-confirmation?code=${registrationParams.emailConfirmation.confirmationCode}">`
        await emailAdapter.sendEmail(
            registrationParams.accountData.email,
            "Configuration of registration",
            "Follow the link to confirm your registration",
            link)
    }
}

