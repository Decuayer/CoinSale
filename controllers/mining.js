const db = require('../routes/db-config');

const mining = (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.json({status:"error", error:"There is problem, try again later."});
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
                if(err) throw err;
                if(!result[0]) {
                    return res.json({status:"error", error:"There is problem, try again later."});
                } else if (result[0].loadedmoney < 50) {
                    return res.json({status:"error", error:"Transactions cannot be made below $50"});
                } else if (result[0].miningday == 1) {
                    return res.json({status:"error", error:"You can mininig once a day"});
                } else if (result[0].boolclick == 1) {
                    db.query('UPDATE users SET boolclick = 0 WHERE email = ?', [email], async (err, result) => {
                        if(err) throw err;
                        console.log(result);
                    })
                    db.query('UPDATE users SET clickcount = clickcount+1 WHERE email = ?', [email], async (err, result) => {
                        if(err) throw err;
                    })
                    db.query('UPDATE users SET miningday = 1 WHERE email = ?', [email], async (err, result) => {
                        if(err) throw err;
                        console.log('Rows affected:', result.affectedRows);
                    })
                    const newbalance = result[0].balance+((result[0].loadedmoney/100)*3.3)
                    db.query('UPDATE users SET balance= ? WHERE email = ?', [newbalance ,email], async (err, result) => {
                        if(err) throw err;
                    })
                    return res.json({status:"success", success:"Minings is completed successfully."});
                } else {
                    db.query('UPDATE users SET boolclick = 1 WHERE email = ?', [email], async (err, result) => {
                        if(err) throw err;
                    })
                    return res.json({status:"start"});
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = mining;