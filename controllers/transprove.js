const db = require('../routes/db-config');

const transprove = (req, res) => {
    console.log(req.query.id)
    try {
        const uuid = req.query.id;
        if (!req.query) {
            console.log("UUID gelmedi.")
        } else {
            db.query('SELECT * FROM transactions WHERE uuid = ?', [uuid], async (err, result) => {
                if (err) throw err;
                db.query('SELECT * FROM users WHERE email = ?', [result[0].email], async (err, result2) => {
                    if (err) throw err;
                    

                    const balance = result[0].witdrawinput + result2[0].balance;
                    console.log(result[0].witdrawinput);
                    console.log(result2[0].balance);
                    const loadedmoney = result[0].witdrawinput + result2[0].loadedmoney;
                    let moneywithdraw = 0;
                    let vip = "VIP 0";
                    if ((balance+result2[0].balance) >= 50) {
                        moneywithdraw = 1;
                    }

                    db.query('SELECT * FROM users WHERE referenceCode = ?', [result2[0].useReferenceCode], async (err, result3) => {
                        if(err) throw err;
                        if(result3[0].moneywithdraw == 1) {
                            if(result[0].witdrawinput >= 100) {
                                db.query('UPDATE users SET usercount = usercount+1, balance = balance+20, usermoneywithdraw = 1 WHERE email = ?', [result3[0].email], async (err, result) => {
                                    if(err) throw err;
                                })
                            } else {
                                db.query('UPDATE users SET usercount = usercount+1, balance = balance+13, usermoneywithdraw = 1 WHERE email = ?', [result3[0].email], async (err, result) => {
                                    if(err) throw err;
                                })
                            }
                        }
                    });


                    if (balance >= 1000 && result2[0].usercount >= 50) {
                        vip = "VIP 5";
                    } else if(balance >= 500 && result2[0].usercount >= 25) {
                        vip = "VIP 4";
                    } else if(balance >= 300 && result2[0].usercount >= 10) {
                        vip = "VIP 3";
                    } else if(balance >= 100 && result2[0].usercount >= 3) {
                        vip = "VIP 2";
                    } else if(balance >= 50 && result2[0].usercount >= 0) {
                        vip = "VIP 1";
                    } else if(balance >= 0 && result2[0].usercount >= 0) {
                        vip = "VIP 0";
                    }
                    
                
                    db.query('UPDATE users SET balance = ?, loadedmoney = ?, moneywithdraw = ?, vip =? WHERE email = ?', [balance, loadedmoney, moneywithdraw, vip, result[0].email], async (err, result) => {
                        if(err) throw err;
                    })
                    db.query('UPDATE transactions SET waiting = ? WHERE uuid = ?', ["Done", uuid], async (err,res) => {
                        if(err) throw err;
                    })
                    res.redirect("./")
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = transprove;