import nodemailer from "nodemailer";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, text: string){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "100callstoeurop",
                pass: "xhjlvrdmplxzkndo",
            }
        })

        let info = await transporter.sendMail({
            from: 'Vladimir <petiryakov@teh.expert>',
            to: email,
            subject: subject,
            text: text
        })
    }
}