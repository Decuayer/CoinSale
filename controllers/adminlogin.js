const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const adminlogin = (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.json({status:"error", error:"Please enter your email and password"});
        } else {
            db.query('SELECT * FROM admin WHERE adminemail = ?', [email], async (err, result) => {
                if(err) throw err;
                if(!result[0] || !await bcrypt.compare(password, result[0].adminpassword)) {
                    return res.json({status:"error", error:"Incorrect email or password"})
                } else {
                    console.log(result[0].idadmin)
                    const token = jwt.sign({idadmin: result[0].idadmin }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES
                    })
                    const cookieOptions = {
                        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie("adminSave", token, cookieOptions);
                    return res.json({status:"success", success:"Admin has been logged in"});
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = adminlogin;