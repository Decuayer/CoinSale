const express = require('express');
const db = require('./routes/db-config');
const app = express();
const cookie = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'assets' )));
app.use("/css ", express.static(__dirname + '/assets/css'));

app.use(express.static(path.join(__dirname, 'public' )));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/js/admin", express.static(__dirname + '/public/js/admin'));
app.use("/css ", express.static(__dirname + '/public/css'));
app.use("/img", express.static(__dirname + '/public/img'));

app.set("view engine", "ejs"); 
app.set("views", "./views");

app.use(cookie());
app.use(express.json());

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected.");
})

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth")); 

app.listen(PORT)