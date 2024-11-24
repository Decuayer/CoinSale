const db = require('../routes/db-config');
const bcrypt = require("bcryptjs");

const settings = async (req,res) => {
    const {email,pastpassword,password,passwordConfirm} = req.body;
    if(!email || !pastpassword || !password || !passwordConfirm) {
        return res.json({status:"error", error:"Input correct way"});
    } else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err,results) => {
            if(err) throw err;
            if(!results[0]) {
                return res.json({status:"error", error:"Try again later."})
            } else if(!await bcrypt.compare(pastpassword, results[0].password)) {
                return res.json({status:"error", error:"Old password does not match."})
            } else if(password != passwordConfirm) {
                return res.json({status:"error", error:"Password don't match."})
            } else {
                const hashedpassword = await bcrypt.hash(password, 8);
                db.query('UPDATE users SET password = ? WHERE id =?', [hashedpassword, results[0].id ], async (err,results) => {
                    if(err) throw err;
                    return res.json({status:"success", success: "Password changed."});
                })
            }
        })
    }
}
module.exports = settings;