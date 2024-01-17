const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname + "/home-page.html"));
    res.sendFile(path.join(__dirname + "/send-remittance.html"));
})

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
console.log(`http://localhost:5000/`);