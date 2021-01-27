var express = require("express");
var path = require("path");
var fs = require("fs");
const { connect } = require("http2");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function (req, res) {
    var content = req.body;
    fs.readFile("db/db.json", 'utf8', function (err, data) {
        var dataArr = JSON.parse(data);
        content.id = dataArr.length + 1;
        dataArr.push(content);
        fs.writeFile("db/db.json", JSON.stringify(dataArr), function (err) {

        });
    });
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.delete('/api/notes/:id', function (req, res) {
    const id = parseInt(req.params.id);

    fs.readFile("db/db.json", 'utf8', function (err, data) {
        var dataArr = JSON.parse(data);
        var ndataArr =[];
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].id !== id) {
                ndataArr.push(dataArr[i]);
            }
        }
        fs.writeFile("db/db.json", JSON.stringify(ndataArr), function (err) {

        });
        res.json(ndataArr);
    })
});


app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});