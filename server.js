const express = require("express");
const bodyParser = require("body-parser"); // Möjlighet att läsa in formulärdata
const app = express();
const port = 3100;

// statiska filer ska hamna i public sökväg: "/"
app.use(express.static("public"));
// använder body parser som middleware skicka med ett objekt
app.use(bodyParser.urlencoded({ extended: true }));
// väljer ejs för att läsa tempaltes
app.set("view engine", "ejs");

// array att lagra kurs i som ska skrivas ut till index
const courseList = [];

// Routing
app.get("/", (req, res) => {
    res.render("index", {
        courseList
    });
});

app.get("/add", (req, res) => {
    res.render("add", {
        errors: [],
        code: "",
        name: "",
        syllabus: "",
        progression: ""
    });
});

app.post("/add", (req, res) => {
    // Läs in formulärdata
    let newCourseCode = req.body.code;
    let newCourseName = req.body.name;
    let newSyllabus = req.body.syllabus;
    let newProgression = req.body.progression;

    let errors = [];

    if (newCourseCode === "") {
        errors.push("Ange en kurskod");
    }
    if (newCourseName === "") {
        errors.push("Ange kursens namn");
    }
    if (newSyllabus === "") {
        errors.push("Ange url till kursplan");
    }
    if (newProgression === "") {
        errors.push("Välj kursnivå");
    }

    if (errors.length > 0) {
        return res.render("add", {
            errors,
            code: newCourseCode,
            name: newCourseName,
            syllabus: newSyllabus,
            progression: newProgression
        });
    }

    courseList.push({
        code: newCourseCode,
        name: newCourseName,
        syllabus: newSyllabus,
        progression: newProgression
    });

    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Starta applikation
app.listen(port, () => {
    console.log("Server is started on port: " + port);
});