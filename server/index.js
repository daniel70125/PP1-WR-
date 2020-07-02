require('dotenv').config();
let express = require('express');
let app = express();
let massive = require('massive');
let ctrl = require('./controller');
const session = require('express-session');
const axios = require('axios');
const nodemailer = require('nodemailer');

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, PASS, USER} = process.env
app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
}));
let email = () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dwrighttt504@gmail.com',
            pass: 'DWright21'
        }
    })
    
    let mailOptions = {
        from: 'dwrighttt504@gmail.com',
        to: 'dwrighttt504@gmail.com',
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<a href='google.com'>Hello world?</a>", // html body
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}


app.delete('/logout', ctrl.delete);
app.delete('/job/:id', ctrl.deletePost);
app.post('/email', ctrl.email)
app.post('/cancelJob/:id', ctrl.cancelJob);
app.post('/job/accept', ctrl.acceptJob);
app.post('/admin/editJob', ctrl.editJob);
app.post('/admin/login', ctrl.adminLogin)
app.post('/register', ctrl.register);
app.post('/admin/addjob', ctrl.addJob)
app.post('/admin/getJobs', ctrl.getAdminJobs);
app.post('/myJob', ctrl.getMyJob);
app.post('/login', ctrl.login);
app.get('/jobs', ctrl.getAllJobs);
app.get('/job/:id', ctrl.getJob)
app.get('/session', (req, res) => {
    if (req.session.user){
        res.status(200).send(req.session.user);
        
    } else {
        // email();
    }
})

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected !');
    
})
.catch(err => console.log(err))

app.listen(SERVER_PORT, () => console.log(`Server Running on port ${SERVER_PORT} !`));



