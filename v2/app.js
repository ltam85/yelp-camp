var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

// MODEL SETUP
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Snowy Lake", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f0c77aa6eab7b8_340.jpg"}, function(err, campground){
//       if(err){
//           console.log(err);
//       } else{
//           console.log("Campground Created");
//           console.log(campground);
//       }
// });

app.get("/", function(req, res){
    res.render("landing");
});

// shows all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else{
           //take all the campgrounds that you retrieved form DB and send to web app
           res.render("campgrounds", {campgrounds: allCampgrounds});
       }
    });
});

// logic to make new campground and redirect to /campgrounds
app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newCamp){
        if(err){
            console.log(err);
        } else{    
            // redirect back to campground page
            res.redirect("/campgrounds"); // by default redirect is a GET request
        }
    });
});

// shows the form -> submits post request to /campgrounds 
// -> redirects to /campgrounds as GET request -> shows all campgrounds
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});