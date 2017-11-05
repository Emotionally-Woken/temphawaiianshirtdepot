const router = require('express').Router()
var nodemailer = require('nodemailer');


module.exports = router
router.post('/', orderConfirmation); // handle the route at yourdomain.com/sayHello

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    //  secure: ,
    //    port: ,
    auth: {
        user: 'azfullstack@gmail.com', // Your real email
        pass: 'a05439yz' // Your real password
    },
    tls: {
        rejectUnauthorized: false
    }
});

function orderConfirmation(req, res, next) {
    const order = req.body
    let orderDetail = ``
    let message = `Congratulations\n Order ${order.id} has been created.\n`
    message += `Mahalo--Thanks for buying!`

    var mailOptions = {
        from: 'azfullstack@gmail.com', // sender address
        to: req.body.email, // list of receivers 'azfullstack@gmail.com'
        subject: `Order ${req.body.id}`, // Subject line
        text: message //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}
