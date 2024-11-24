const db =  require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggedIn = (req, res, next) => {
    if (!req.cookies.userSave) return next();
    try {
        const decoded = jwt.verify(req.cookies.userSave, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id = ?',[decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * from users WHERE useReferenceCode = ?', [req.user.referenceCode], (err, result1) => {
                if(err) return next();
                req.userinfo = result1;
                db.query('SELECT * FROM transactions WHERE email = ?',[req.user.email], (err,result2) => {
                    if(err) return next();
                    req.transactions = result2;
                    db.query('SELECT * FROM settings WHERE id=1', (err,result3) => {
                        if(err) return next();                        
                        req.settings = result3;
                        db.query('SELECT * FROM viptable', (err,result4) => {
                            if(err) return next();                        
                            req.viptable = result4;
                            return next();
                        })
                    })
                })
            })
        })
    } catch (err) {
        if(err) return next();
    }
}
module.exports = loggedIn;