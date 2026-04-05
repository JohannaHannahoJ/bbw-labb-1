const express = require("express");
const bodyParser = require("body-parser"); // Möjlighet att läsa in formulärdata
const app = express();
const port = 3100;

// statiska filer ska hamna i public sökväg: "/"
app.use(express.static("public"));
// använder body parser som middleware skicka med ett objekt
app.use(bodyParser.urlencoded({extended: true}));
// väljer ejs för att läsa tempaltes
app.set("view engine", "ejs");


// Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {
    res.render("add");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Starta applikation
app.listen(port, () => {
    console.log("Server is started on port: " + port);   
});