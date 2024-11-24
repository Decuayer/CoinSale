const adminlogout = (req, res) => {
    res.clearCookie("adminSave");
    res.redirect("./")
}   
module.exports = adminlogout;