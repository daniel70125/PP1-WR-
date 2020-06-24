


module.exports = {
    login :async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        const user = await db.checkUser(email, password);
        
        if (!user[0]){
            return res.status(404).send('Incorrect E-Mail or Password !')
        }
        req.session.user = user[0];
        res.status(200).send(req.session.user);
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
        console.log(id, title, description, location, company_id, img, pay)
        let editedJob = await db.editJob(id, title, description, location, company_id, img, pay)

        if (!editedJob[0]){
            return res.sendStatus(404)
        }
        res.status(200).send(editedJob[0]);
    }
}