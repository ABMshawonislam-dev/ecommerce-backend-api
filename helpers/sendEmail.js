const nodemailer = require("nodemailer")

async function sendEmail(email,varify,template){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "citesmern2104@gmail.com", 
          pass: "dvduwhzhnfpquwxz", 
        },
      });
    
  
      let info = await transporter.sendMail({
        from: "citesmern2104@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Please Varify Your Email", // Subject line
        html: template(varify), // html body
      });
}

module.exports = sendEmail