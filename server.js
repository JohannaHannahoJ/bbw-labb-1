const express = require("express");
const bodyParser = require("body-parser"); // Möjlighet att läsa in formulärdata

const db = require("./install");

const app = express();
const port = 3100;

// statiska filer ska hamna i public sökväg: "/"
app.use(express.static("public"));
// använder body parser som middleware skicka med ett objekt
app.use(bodyParser.urlencoded({ extended: true }));
// väljer ejs för att läsa tempaltes
app.set("view engine", "ejs");



// Routing
// -startsida
app.get("/", (req, res) => {
    db.all("SELECT * FROM courses", (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.render("index", {
            courseList: rows
        });
    });
});

// lägg till kurs-sida
app.get("/add", (req, res) => {
    res.render("add", {
        errors: [],
        code: "",
        name: "",
        syllabus: "",
        progression: ""
    });
});

// POST fr form
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

    const stmt = db.prepare("INSERT INTO courses (code, name, syllabus, progression) VALUES (?, ?, ?, ?)");
    stmt.run(newCourseCode, newCourseName, newSyllabus, newProgression);
    stmt.finalize();

    res.redirect("/");
});

// Radera kurser
app.get('/delete/:id', (req, res) => {
  let id = req.params.id;
    db.run('DELETE FROM courses WHERE course_id = ?', id, (err) => {
    if (err) console.log(err.message);

    res.redirect('/');
  });
});

// om-sidan
app.get("/about", (req, res) => {
    res.render("about");
});

// Starta applikation
app.listen(port, () => {
    console.log("Server is started on port: " + port);
});