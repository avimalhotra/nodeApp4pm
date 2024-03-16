const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
    // replace `user` and `pass` values 
    user: 'maddison53@ethereal.email',
    pass: 'jn7jnAPss4f63QBp6D'
    }
});
    
async function main() {
      // send mail with defined transport object
    const info = await transporter.sendMail({
    from: '"Tech Altum Institute" ',        // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "test mail from tech Altum", // Subject line
    text: "Hello There?", // plain text body
    html: "<b>Hello world?</b>",        // html body
});
    
console.log("Message sent: %s", info.messageId);
// Message sent:   
}
    
main().catch(console.error);


