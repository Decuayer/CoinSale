const express = require('express');
const loggedIn = require("../controllers/loggedin");
const logout = require('../controllers/logout');
const adminloggedIn = require('../controllers/adminloggedin');
const adminlogout = require('../controllers/adminlogout');
const transprove = require('../controllers/transprove');
const withdrawaprove = require('../controllers/withdrawaprove');
const reject = require('../controllers/reject');
const deletetrans = require('../controllers/deletetrans');
const miningreset = require('../controllers/miningreset');
const router = express.Router();

router.get('/', loggedIn, (req, res) => {
    if(req.user) {
        res.render("index", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
});

router.get('/register', (req, res) => {
    res.sendFile("register.html", {root:"./public/"});
});

router.get('/login', (req, res) => {
    res.sendFile("login.html", {root:"./public/"});
});

router.get('/profile', loggedIn, (req, res) => {
    if(req.user) {
        res.render("main", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/user', loggedIn , (req, res) => {
    if(req.user) {
        res.render("user", {status:"loggedIn", data:req.user, users:req.userinfo, trans:req.transactions, viptable: req.viptable});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/faq', loggedIn, (req, res) => {
    if(req.user) {
        res.render("faq", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/rules', loggedIn, (req, res) => {
    if(req.user) {
        res.render("rules", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/deposit', loggedIn, (req, res) => {
    if(req.user) {
        res.render("deposit", {status:"loggedIn", data:req.user, data2:req.settings});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/privacy&terms', loggedIn, (req, res) => {
    if(req.user) {
        res.render("privacy&terms", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/mining', loggedIn, (req, res) => {
    if(req.user) {
        res.render("mining", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/withdraw', loggedIn, (req, res) => {
    if(req.user) {
        res.render("withdraw", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/campaigns', loggedIn, (req, res) => {
    if(req.user) {
        res.render("campaigns", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get('/settings', loggedIn, (req, res) => {
    if(req.user) {
        res.render("settings", {status:"loggedIn", data:req.user});
    } else {
        res.render("index", {status:"no", data:"nothing"});
    }
})

router.get("/logout", logout);


/*----------------------------------------*/
router.get('/admin', (req, res) => {
    if(req.admin) {
        res.render("admin-page", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }})

router.get('/admin-page', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("admin-page", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

/*----------------------------------------*/
router.get('/admin-page/home', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/Home", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get('/admin-page/dashboard', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/Dashboard", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get('/admin-page/basic', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/Basic", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans, data2:req.settings});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get('/admin-page/users', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/User", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})
router.get('/admin-page/chatbot', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/ChatBot", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get('/admin-page/transactions', adminloggedIn, (req, res) => {
    if(req.admin) {
        res.render("partials/Transactions", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get('/admin-page/users/update', adminloggedIn, (req, res) => {
    const id = req.query;
    if(req.admin) {
        res.render("partials/Update", {status:"adminloggedIn", data:req.admin , users: req.users, trans: req.trans, id:id});
    } else {
        res.render("admin", {status:"no", data:"nothing"});
    }
})

router.get("/admin-page/logout", adminlogout);

router.get("/admin-page/transactions/approve?", transprove, (req, res) => {
    const id = req.query;
    res.send(id);
});

router.get("/admin-page/transactions/withdrawaprove?", withdrawaprove, (req, res) => {
    const id = req.query;
    res.send(id);
});

router.get("/admin-page/transactions/reject?", reject, (req, res) => {
    const id = req.query;
    res.send(id);
});

router.get("/admin-page/transactions/deletetrans?", deletetrans, (req, res) => {
    const id = req.query;
    res.send(id);
});

router.get("/admin-page/basic/miningreset", miningreset, (req, res) => {

});



module.exports = router;
