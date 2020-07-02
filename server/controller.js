const bcrypt = require('bcrypt');
const nodemailer  = require('nodemailer');




module.exports = {
    login :async (req, res) => {
        const db = req.app.get('db')
        const { password, email } = req.body

        const user = await db.checkUser(email)
        console.log(user[0]);

        if(!user[0]){
            return res.status(404).send('User does not exist')
        } else {
            const authenticated = bcrypt.compareSync(password, user[0].password)
            if (authenticated) {
                res.status(200).send(user[0])
            } else {
                res.status(403).send('Email or password incorrect')
            }
        }

    },
    getAdminJobs: async(req, res) => {
        const {id} = req.body
        const db = req.app.get('db');

        const jobs = await db.adminJobs(id)
        res.status(200).send(jobs);

    },
    adminLogin: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        const user = await db.checkAdmin(email, password);
        
        if (!user[0] || !user[0].role_id){
            return res.status(404).send('Incorrect E-Mail or Password !')
        }
        
        req.session.user = user[0];
        res.status(200).send(req.session.user);
        email();
    },
    addJob: async (req, res) => {
        const db = req.app.get('db');
        const {title, description, location, company_id, img, pay} = req.body;

        const newJob = await db.addJob([title, description, location, company_id, img, pay]);
        
        res.status(200).send(newJob);
    },
    delete: (req, res) => {
        req.session.destroy();
        res.send('Logged Out')
    },
    getJob: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const job  = await db.getJob(id);

        if (!job[0]){
            return res.status(404).send('No Jobs Found!')
        }
        res.status(200).send(job[0]);
    },
    editJob: async (req, res) => {
        const db = req.app.get('db');
        const {id, title, description, location, company_id, img, pay} = req.body;
        let editedJob = await db.editJob(id, title, description, location, company_id, img, pay)

        if (!editedJob[0]){
            return res.sendStatus(404)
        }
        res.status(200).send(editedJob);
    },
    deletePost: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db');

        const deleted = await db.deletePost(id);
        res.status(200).send('Deleted !');
    },
    getAllJobs: async (req, res) => {
        const db = req.app.get('db');
        const allJobs = await db.getAllJobs();
        if (!allJobs){
            return res.sendStatus(404)
        }
        res.status(200).send(allJobs);
    },
    register: async (req, res) => {
        const db = req.app.get('db');
        const {email, password, username, img, skill1, skill2, skill3} = req.body;

        const existingUser = await db.checkUser(email);
        if (existingUser[0]){
            return res.status(409).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        
        const newUser = await db.newUser([email, hash, username, img,  skill1, skill2, skill3, username ])

        req.session.user = newUser[0];

        res.status(200).send(req.session.user);
    },
    acceptJob: async (req, res) => {
        const db = req.app.get('db');
        const {postId, title, description, location, company_id, id, img, pay} = req.body;

        const job = await db.acceptJob(postId, title, description, location, company_id, id, img, pay);
        if (!job){
            return res.status(409).send('No Job Exists!') 
        }
        res.status(200).send(job);
    }, getMyJob: async(req, res) => {
        const db = req.app.get('db');
        const {id} = req.body;

        const jobs = await db.myJob(id);

        if (!jobs[0]){
            res.sendStatus(404);
        }
        res.status(200).send(jobs);
    },
    cancelJob: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        
        const job = await db.getJob(id);
        const {title, description, location, company_id, worker_id, img, pay} = job[0];
       const canceledJob = await db.cancel(id, title, description, location, company_id, null, img, pay);
       res.status(200).send('Canceled Shift');
        
    },
    email: (req, res) => {
        const {email, username} = req.body;
        let emailsender = () => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dwrighttt504@gmail.com',
                    pass: 'DWright21'
                }
            })
            
            let mailOptions = {
                from: 'dwrighttt504@gmail.com',
                to: email,
                subject: "Signup Completed! ✔", // plain text body
                html: `<h1>Hello ${username} !</h1>
                    <p>This is an automated message from Darth Vader, "I am your father now !"</p>
                    <p>No, but seriously welcome to my site!</p>
                    <a href="http://68.183.132.10:4000/#/admin">Jobbly</a>
                    <h5>email: admin1@gmail.com</h5>
                    <h5> password: admin1</h5>
                `, // html body
            }
            
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        }
        emailsender();
    }
}