const bcrypt = require('bcrypt')


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
    getAllJobs: (req, res) => {

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
        console.log(user[0].role_id)
        req.session.user = user[0];
        res.status(200).send(req.session.user);
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
        console.log(editedJob);
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
        console.log(newUser);
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
    }
}