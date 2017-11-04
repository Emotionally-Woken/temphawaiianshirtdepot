const router = require('express').Router()
var nodemailer = require('nodemailer');

module.exports = router
router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'azfullstack@gmail.com', // Your email id
            pass: 'a05439yz' // Your password
        }
    });
    var text = 'Hello world from \n\n' + req.body.name;
    var mailOptions = {
        from: 'azfullstack@gmail.com>', // sender address
        to: 'azfullstack@gmail.com', // list of receivers
        subject: 'Email Example', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
}