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
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description
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

// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with the provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(port);
