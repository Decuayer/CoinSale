const db = require("../routes/db-config");
const {v1: uuidv1, v4: uuidv4, v1} = require("uuid");

const deposit = (req, res) => {
    try {
        const {email, prevbalance, witdrawInput} = req.body;

        if(!email || !prevbalance || !witdrawInput) {
            return res.json({status:"error", error:"Please try again later."});
        } else if(witdrawInput < 50) {
            return res.json({status:"error", error:"The minimum amount you can upload is $50."});
        } else {
            
            let values = [
                email,
                prevbalance,
                witdrawInput,
                (parseInt(prevbalance) + parseInt(witdrawInput)),
                'Deposit',
                'ts-'+uuidv1(),
                'Waiting',
            ]
            db.query('INSERT INTO transactions (email, prevbalance, witdrawinput, newbalance, type, uuid, waiting) VALUES(?,?,?,?,?,?,?)', values, async (err, result) => {
                if (err) throw err; 
                console.log("All Rows Inserted"); 
            })
            return res.json({status:"success", success:"Your deposit has been processed."});
        }
    } catch (error) {
        console.log(error);

    }
}

module.exports = deposit;