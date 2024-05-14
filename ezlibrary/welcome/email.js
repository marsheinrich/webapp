var nodemailer = require('nodemailer');
var exports = module.exports = {};

var transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword
    }
});

exports.sendEmail = function(rating, name, email, phone, message, consent) {
    var body = "You got a rating of " + rating + " !";
    body = body + "<br/><br/>From : " + name;
    body = body + "<br/>Email : " + email;
    body = body + "<br/>Phone : " + phone;
    body = body + "<br/>Message : " + message;
    body = body + "<br/>Consent to contact : " + consent;

    var mailOptions = {
        from: '<email>@zoho.com', // sender address
        to: 'feedback@ezclocker.com', // list of receivers
        subject: 'Rating', // Subject line
        html: body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
}
