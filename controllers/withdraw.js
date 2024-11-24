const db = require("../routes/db-config");
const {v1: uuidv1, v4: uuidv4, v1} = require("uuid");


const withdraw = (req, res) => {
    try {
        const {email, accountNumber, witdrawInput} = req.body;
        if (!email || !accountNumber || !witdrawInput) {
            return res.json({status:"error", error:"Please try again later."});
        }else {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err,result) => {
                if (err) throw err;
                if(result[0].loadedmoney < 50) {
                    return res.json({status:"error", error:"Money in your account is less than $50, you cannot withdraw."});
                } else if(result[0].balance/2 < witdrawInput) {
                    return res.json({status:"error", error:"You can't withdraw all your money. At least half of it must remain in the account."});
                } else if (result[0].moneywithdraw == 0) {
                    return res.json({status:"error", error:"Your deposit money is less than $50. You must deposit at least $50 to withdraw money."});
                } else if (result[0].usermoneywithdraw == 0) {
                    return res.json({status:"error", error:"You must call one person for each withdrawal."});
                } else if (witdrawInput < 30) {
                    return res.json({status:"error", error:"You can withdraw over $30."});
                } else {
                    let values = [
                        email,
                        result[0].balance,
                        witdrawInput,
                        (parseInt(result[0].balance) - parseInt(witdrawInput)),
                        'Withdraw',
                        'tw-'+uuidv1(),
                        'Waiting',
                        accountNumber,
                    ]
                    db.query('INSERT INTO transactions (email, prevbalance, witdrawinput, newbalance, type, uuid, waiting, accountnumber) VALUES(?,?,?,?,?,?,?,?)', values, async (err, result) => {
                        if (err) throw err; 
                        console.log("All Rows Inserted"); 
                    })
                    const newbalance = result[0].balance - witdrawInput
                    const newloadmoney = result[0].loadedmoney - witdrawInput
                    db.query('UPDATE users SET balance= ?, loadedmoney = ?, moneywithdraw = 0, usermoneywithdraw = 0 WHERE email = ?', [newbalance, newloadmoney ,email], async (err, result) => {
                        if(err) throw err;
                    })
                    return res.json({status:"success", success:"Your withdraw has been processed."});

                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = withdraw;