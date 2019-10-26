var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// public folder
app.use(express.static("client/build"));

app.get("*", function(req, res) {
    // this is a way to send a file. It will create correct path for Mac & PC
    res.sendFile(path.resolve(__dirname, 'client', 'build', "index.html"));
});

// routes
// require("./routes/twitter-api-routes.js");

app.listen(port, function() {
    console.log("listening on port", port);
});
