var express = require("express");
var path = require("path");
var fs = require("fs");
const { connect } = require("http2");

var app = express();
var PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function (req, res) {
    var content = JSON.stringify(req.body);
    fs.writeFileSync("db/db.json", content, function () {

    })
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.delete("/api/notes/:id", function (req, res) {
    var content = req.params.id;
    console.log(content);
    if (content === -1) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

   // var result = json.splice(content, 1);
    fs.readFile("db/db.json", JSON.stringify(content), function (err) {
        if (err) throw err;

    });

});


app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});