const express = require('express');
const register = require('./register');
const login = require('./login');
const deposit = require('./deposit');
const withdraw = require('./withdraw');
const adminlogin = require('./adminlogin');
const mining = require('./mining');
const basic = require('./basic');
const update = require('./update');
const settings = require('./settings');
const router = express.Router();

router.post("/register", register); 
router.post("/login", login);
router.post("/admin", adminlogin);
router.post("/deposit", deposit)
router.post("/withdraw", withdraw);
router.post("/mining", mining);
router.post("/basic", basic);
router.post("/update", update);
router.post("/settings", settings);

module.exports = router;