module.exports = {
    login :async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        const user = await db.checkUser(email, password);

        if (!user[0]){
            return res.status(404).send('Incorrect E-Mail or Password !')
        }
        res.send(user[0]);
    }
}