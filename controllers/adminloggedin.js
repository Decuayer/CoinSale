const db =  require("../routes/db-config");
const jwt = require("jsonwebtoken");

const adminloggedIn = (req, res, next) => {
    if (!req.cookies.adminSave) return next();
    try {
        const decoded = jwt.verify(req.cookies.adminSave, process.env.JWT_SECRET);
        db.query('SELECT * FROM admin WHERE idadmin = ?',[decoded.idadmin], (err, result) => {
            if(err) return next();
            req.admin = result[0];
            db.query('SELECT * FROM users', (err,result) => {
                if(err) return next();
                req.users = result;
                db.query('SELECT * FROM transactions', (err,result) => {
                    if(err) return next();
                    req.trans = result;
                    db.query('SELECT * FROM settings WHERE id=1', (err,result2) => {
                        if(err) return next();
                        req.settings = result2;
                        return next();
                    })
                })
            })
        })
    } catch (err) {
        if(err) return next();
    }
}

module.exports = adminloggedIn;