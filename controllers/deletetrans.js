const db = require('../routes/db-config');

const deletetrans = (req, res) => {
    try {
        const uuid = req.query.id;
        if(!req.query) {
            console.log("UUID gelmedi.")
        } else {
            db.query('SELECT * FROM transactions WHERE uuid = ?', [uuid], async (err, result) => {
                if (err) throw err;
                db.query('DELETE FROM transactions WHERE uuid = ?', [uuid], async (err,res) => {
                    if(err) throw err;
                })
                res.redirect("./")
            })

        }
    } catch(err) {
        console.log(err);   
    }

}

module.exports = deletetrans;