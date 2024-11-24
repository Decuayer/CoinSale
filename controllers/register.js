const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const {v1: uuidv1, v4: uuidv4, v1} = require("uuid");

const register = async (req, res) => {
    const { nickname, namesurname, email, password, passwordConfirm, tel, referenceCode, checkbox } = req.body
    if(!nickname || !namesurname || !email || !password || !passwordConfirm || !tel || !referenceCode || !checkbox) {
        return res.json({status:"error", error:"Input correct way"});
    } else {
        db.query('SELECT nickname from users WHERE nickname = ?', [nickname], async (err, results) => {
            if(err) throw err;
            if(results[0]) {
                return res.json({status:"error", error:"Nickname has already been registered"})
            } else {
                db.query('SELECT referenceCode from users WHERE referenceCode = ?', [referenceCode], async (err, results) => {
                    if(err) throw err;
                    if(results[0]) {
                        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
                            if(err) throw err;
                            if(results[0]) {
                                return res.json({status:"error", error:"Email has already been registered"})
                            } else if(password != passwordConfirm) {
                                return res.json({status:"error", error:"Password don't match"})
                            } else {
                                db.query('SELECT tel from users WHERE tel = ?', [tel], async (err, results) => {
                                    if(err) throw err;
                                    if(results[0]) {
                                        return res.json({status:"error", error:"Phone Number has already been registered"})
                                    } else {
                                        const hashedpassword = await bcrypt.hash(password, 8);
                                        db.query('INSERT INTO users SET ?', {
                                            nickname: nickname,
                                            name: namesurname,
                                            email: email,
                                            password: hashedpassword,
                                            tel: tel,
                                            referenceCode: uuidv1(),
                                            useReferenceCode: referenceCode
                                        }, (error, results) => {
                                            if(error) throw error;
                                            return res.json({status:"success", success: "User has been registered"});
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        return res.json({status:"error", error:"Reference Code has wrong."})
                    }
                })
            }
        })
    }
}

module.exports = register;