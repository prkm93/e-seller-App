var express    = require("express"),
	app 	   = express(),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"),
    passport   = require("passport"),
    path 	   = require("path"),	
 cookieParser  = require("cookie-parser"),
  LocalUser    = require("passport-local"),
methodOverride = require("method-override"),
	flash      = require("connect-flash"),
	session    = require("express-session"),
   mongoStore  = require("connect-mongo")(session), //this exports function which is required to pass the user's session
	Product	   = require("./models/product"),
	User	   = require("./models/user"),
	Admin 	   = require("./models/admin");

var electronicRoutes = require("./controllers/products/electronics");
var clothRoutes = require("./controllers/products/clothing");
var indexRoutes = require("./controllers/index");
var cartRoutes = require("./controllers/cart");
//var commentRoute = require("./controllers/comments");

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/eSeller_db");

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public")));
app.use(methodOverride("_method"));

app.use(session({
	secret:"This is secret",
	resave : false,
	saveUninitialized:false,
	store : new mongoStore({mongooseConnection : mongoose.connection}), // tells to use existing mongoose connection instead of opening new connection
	cookie :{maxAge : 60*60*1000} 			 //give userid here							// for how long the session should live before they expire (in milliseconds)
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalUser(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.currentAdmin	= req.admin;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.session = req.session; // this makes sure that session is used in all ejs without passing it explicitly in controller routes
	next();
});

app.use("/", indexRoutes);
app.use("/electronics", electronicRoutes);
app.use("/clothes", clothRoutes);
app.use("/cart",cartRoutes);

app.listen(3000,process.env.IP,function(){
	console.log("Server has been started for e-Seller App");
});