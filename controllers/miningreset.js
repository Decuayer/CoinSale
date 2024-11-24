const db = require('../routes/db-config');

const miningreset = (req,res) => {
    try {
        db.query('UPDATE users SET miningday=0', async (err, result) => {
            
        })
        res.redirect("./")
    } catch (err) {
        console.log(err);
    }
}
module.exports = miningreset;