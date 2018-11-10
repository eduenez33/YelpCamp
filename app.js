var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
const port = 3000;

mongoose.connect(
  "mongodb://localhost/yelp_camp",
  { useNewUrlParser: false }
);

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Navajo Hill",
//     image:
//       "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1500&q=80"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log("Error!");
//     } else {
//       console.log("Newly Created Campground: ");
//       console.log(campground);
//     }
//   }
// );

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
  // GET ALL CAMPGROUNDS FROM DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  // Create new Campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.listen(port);
