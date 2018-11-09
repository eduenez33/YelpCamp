var express = require("express");
var app = express();
const port = 3000;
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {
      name: "Salmon Creek",
      image:
        "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=1500&q=80"
    },
    {
      name: "Navajo Hill",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1500&q=80"
    },
    {
      name: "White Water Rapids",
      image:
        "https://images.unsplash.com/photo-1475257873405-64d6dd9764c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b612709ccb927b6891a9fb4f92245b4&auto=format&fit=crop&w=2299&q=80"
    }
  ];

  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {});

app.listen(port);
