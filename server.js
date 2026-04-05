const express = require("express");
const app = express();
const port = 3100;

app.use(express.static("public"));
app.set("view engine", "ejs");


// Routing
app.get("/", (req, res) => {
    //res.send("Hello world!");
    res.render("index");
});

// Starta applikation
app.listen(port, () => {
    console.log("Server is started on port: " + port);   
});