const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const update = (req, res) => {
    try {
        const {nickname,namesurname,tel,email,vip,loadedmoney,balance,referenceCode,useReferenceCode,usercount,moneywithdraw,password} = req.body;
        if (!nickname || !namesurname || !tel || !email || !vip || !loadedmoney || !balance || !referenceCode || !useReferenceCode || !usercount || !moneywithdraw) {
            return res.json({status:"error", error:"Bilgiler eksik"});
        } else {
            db.query('SELECT * from users WHERE email = ?', [email], async (err,result) => {
                if(err) throw err;
                if(!result[0]) {
                    return res.json({status:"error", error:"Database ile eşlemedi."})
                } else {
                    if(password){
                        const hashedpassword = await bcrypt.hash(password, 8);
                        db.query('UPDATE users SET nickname = ?, name = ?, tel = ?, vip = ?, loadedmoney = ?, balance = ?, referenceCode = ?, useReferenceCode = ?, usercount = ?, moneywithdraw = ?, password = ? WHERE id = ?', [nickname, namesurname, tel, vip, loadedmoney, balance, referenceCode, useReferenceCode, usercount, moneywithdraw, hashedpassword, result[0].id], async (err,result2) => {
                            if(err) throw err;
                            return res.json({status:"success", success:"İşlem başarılı. Şifre değiştirildi"})
                        })
                    } else {
                        db.query('UPDATE users SET nickname = ?, name = ?, tel = ?, vip = ?, loadedmoney = ?, balance = ?, referenceCode = ?, useReferenceCode = ?, usercount = ?, moneywithdraw = ? WHERE id = ?', [nickname, namesurname, tel, vip, loadedmoney, balance, referenceCode, useReferenceCode, usercount, moneywithdraw, result[0].id], async (err,result2) => {
                            if(err) throw err;
                            return res.json({status:"success", success:"İşlem başarılı."})
                        })
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = update;