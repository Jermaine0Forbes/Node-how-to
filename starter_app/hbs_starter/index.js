require("./mvc/models/db");
require('dotenv').config();
var express = require('express');
var body = require('body-parser');
var cookie = require('cookie-parser');
var path = require('path');
var app = express();
var ip =  process.env.IP || 'localhost'; // change the IP address to get your 
var cors = require("cors");
var port = process.env.PORT || 3001;
const hbs = require("express-handlebars");
var routes = require('./mvc/routes/router');


app.use(cors());
app.engine('hbs',hbs({
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/mvc/views/layouts/',
    partialsDir: __dirname + '/mvc/views/partials/'
}))
app.set("view engine","hbs");
// app.locals.basedir = path.join(__dirname,"mvc/views"); // setting the views path
app.set("views",path.join(__dirname,"mvc/views")); // setting the views path
app.use(express.static(path.join(__dirname,'public')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

app.use("/", routes);

app.use(function(req,res,next){
	if(res.status(404)){
	  res.render('error/400');
	}
    console.log(typeof next)
    console.log(next)

    return next();
});

app.use(function(err,req,res,next){
    let path ;
     switch(res.statusCode){
         case 500:
            path = "error/500";
         break;
         case 502:
            path = "error/502";
        break;
         case 503:
            path = "error/503";
     }
     res.render(path,{errTitle:err});
})

app.listen(port, ip, function(){
    var n = process.env.APP_ENV;
    const code = require('crypto').randomBytes(64).toString('hex');
    console.log("node connected to "+port);
    console.log("node environment is in "+n)
    console.log("encrypted key")
    console.log(code)
})
