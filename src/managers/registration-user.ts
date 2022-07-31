import {UserAccount, UserInputModel} from "../types/user.type";
import {emailAdapter} from "../adapters/email-adapter";


export const emailManager = {
    async sendEmailConfirmationMessage(registrationParams: UserAccount){
        /*https://student-demo-5.herokuapp.com*/
        const link = `To verify your email, go to <a href="http://localhost:5000/auth/registration-confirmation?code=${registrationParams.emailConfirmation.confirmationCode}">there</a>"`
        await emailAdapter.sendEmail(
            registrationParams.accountData.email,
            "Configuration of registration",
            "Follow the link to confirm your registration",
            link)
    }
}

