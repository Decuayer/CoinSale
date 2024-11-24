const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.json({status:"error", error:"Please enter your email and password"});
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
                if(err) throw err;
                if (!result[0]) {
                    db.query('SELECT * FROM users WHERE nickname = ?', [email], async (err, result2) => {
                        if(!result2[0] || !await bcrypt.compare(password, result2[0].password)) {
                            return res.json({status:"error", error:"Incorrect nickname or password"})
                        } else {
                            const token = jwt.sign({id: result2[0].id }, process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRES
                            })
                            const cookieOptions = {
                                expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
                                httpOnly: true
                            }
                            res.cookie("userSave", token, cookieOptions);
                            return res.json({status:"success", success:"User has been logged in"});
                        }
                    })
                } else {
                    if(!result[0] || !await bcrypt.compare(password, result[0].password)) {
                        return res.json({status:"error", error:"Incorrect email or password"})
                    } else {
                        const token = jwt.sign({id: result[0].id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES
                        })
                        const cookieOptions = {
                            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie("userSave", token, cookieOptions);
                        return res.json({status:"success", success:"User has been logged in"});
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = login;