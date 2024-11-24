const db =  require("../routes/db-config");

const basic = (req, res) => {
    try {
        const {accountNumber} = req.body;
        if(!accountNumber) {
            return res.json({status:"error", error:"Daha sonra tekrar dene"});
        } else {
            db.query('UPDATE settings SET accountiban = ? WHERE id = 1', [accountNumber], async (err,result) => {
                if(err) throw err;
                return res.json({status:"success", success:"İşlem Başarılı."});
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = basic;