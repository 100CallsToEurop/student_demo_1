import nodemailer from "nodemailer";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, text: string){
        let transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: "petiryakov@teh.expert",
                pass: "m{mbs60OGoIK@smtp.mail.ru",
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