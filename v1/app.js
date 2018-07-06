var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var campgrounds = [ 
        {name: "Lonely Ridge", image: "https://farm5.staticflickr.com/4093/4891132595_cdc355d80e.jpg"},
        {name: "Stardew Trail", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c278a5e4b5b8_340.jpg"},
        {name: "Snowy Lake", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f0c279a3efbcbb_340.jpg"},
        {name: "Lonely Ridge", image: "https://farm5.staticflickr.com/4093/4891132595_cdc355d80e.jpg"},
        {name: "Stardew Trail", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c278a5e4b5b8_340.jpg"},
        {name: "Snowy Lake", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f0c279a3efbcbb_340.jpg"},
        {name: "Lonely Ridge", image: "https://farm5.staticflickr.com/4093/4891132595_cdc355d80e.jpg"},
        {name: "Stardew Trail", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c278a5e4b5b8_340.jpg"},
        {name: "Snowy Lake", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f0c279a3efbcbb_340.jpg"}
    ]

app.get("/", function(req, res){
    res.render("landing");
});

// shows all campgrounds
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

// logic to make new campground and redirect to /campgrounds
app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campground page
    res.redirect("/campgrounds"); // by default redirect is a GET request
});

// shows the form -> submits post request to /campgrounds 
// -> redirects to /campgrounds as GET request -> shows all campgrounds
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});