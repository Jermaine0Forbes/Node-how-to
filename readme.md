# How to Node.js

- [how to use process.env][env]
- [how to upgrade node with nvm][upgrade-nvm]
- how to set up a basic node.js application

[home]:#how-to-nodejs
[env]:#how-to-use-processenv
[upgrade-nvm]:#how-to-upgrade-nvm


### how to set up a  basic node.js application

<details>
<summary>
View Content
</summary>

:link: **Reference**

- []()
---

1. first create a new folder and type npm init
2. now install express `npm i express --save`
3. now install dependencies that's needed 

```
 npm i  body-parser cookie-parser cors debug crypto dotenv
```
4. create the index js file that is supposed to initialize the express app 

```js
const express = require('express')
const app = express()
const port = 3005 // choose the port that is opened in your environment

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


```

5. add this code to add the dependencies that you've installed to get the app up and running 

```js

var express = require('express');
var body = require('body-parser');
var cookie = require('cookie-parser');
var path = require('path');
var app = express();
var ip =  process.env.IP || 'localhost'; // change the IP address to get your 
var cors = require("cors");
var port = process.env.PORT || 3001;
require('dotenv').config();



app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

app.get("/", function(req, res){
  res.send("Welcome Home")
})
app.use(function(req,res,next){
	if(res.status(404)){
	  res.render('error/400');
	}

    next();
});

app.use(function(err,req,res,next){
      if(res.status(500)){
    	  var title = err;
        res.render('error/500',{errTitle:title});
    }else if(res.status(502)){
        res.render('error/500',{errTitle:502});
    }else if(res.status(503)){
        res.render('error/500',{errTitle:503});
    }
})


app.listen(port, ip, function(){
    var n = process.env.APP_ENV;
    const code = require('crypto').randomBytes(64).toString('hex');
    console.log("node connected to "+port);
    console.log("node environment is in "+n)
})
```
6. create an .env file to store your variables

```
 vim .env
```

```
DB_USERNAME="jermaine"
DB_PASSWORD=""
DB_PORT="1234"
PORT=1738
IP=123.123.123
DB_NAME="Test"
APP_ENV="development"
TOKEN_SECRET="9f0dc1da0366d17fa6902386c6475e75c71b0a8b09b2bae4cca27354ab304ef659b3baa212aed819a71abef7ff07e5d9ffb3be7e41004d4b9c9d33c809a535ec"
```
7. create folders that are supposed to hold the mvc structure

```
 mkdir mvc mvc/routes mvc/models/ mvc/controllers mvc/views
```

8. Create the router `vim mvc/routes/router.js` and add any route path that are supposed to serve information like so

```js
var express = require('express');
var route = express.Router();

route.get("/", (req,res) => {
  res.send("this is the home page");
})

module.exports = route;
```

9. Now in the app.js file require the path to the router that you created,
 and add it in the **app.use** method like so

```js

var express = require('express');
var body = require('body-parser');
var cookie = require('cookie-parser');
var path = require('path');
var app = express();
var ip =  process.env.IP || '0.0.0.0'; 
var cors = require("cors");
var port = process.env.PORT || 3001;
var routes = require('./mvc/routes/router');// require the router so then you can serve your files
require('dotenv').config();



app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

// app.get("/", function(req, res){
//   res.send("Welcome Home")
// })

app.use("/", routes); // this is how you can add the routes

app.use(function(req,res,next){
	if(res.status(404)){
	  res.render('error/400');
	}

    next();
});

app.use(function(err,req,res,next){
      if(res.status(500)){
    	  var title = err;
        res.render('error/500',{errTitle:title});
    }else if(res.status(502)){
        res.render('error/500',{errTitle:502});
    }else if(res.status(503)){
        res.render('error/500',{errTitle:503});
    }
})


app.listen(port, ip, function(){
    var n = process.env.APP_ENV;
    const code = require('crypto').randomBytes(64).toString('hex');
    console.log("node connected to "+port);
    console.log("node environment is in "+n)
})
```

10. Install a template engine to set up your views like so 

```
npm install handlebars express-handlebars --save
```

11. Then, require the template engine and add it to the express.engine method, configuring the view path,
and declaring the extension file express should look for when rendering a view

```js
const hbs = require("express-handlebars");// requiring the handlebars

app.use(cors());
app.engine("hbs",hbs())//running the handlebars method to set up the template engine
app.set("views",path.join(__dirname,"mvc/views")); // setting the views path
app.set("view engine", "hbs" ); // setting the extension file
app.use(express.static(path.join(__dirname,'public')));

```


12. Also, if you're using the handlebars method it is required to create a layouts file that is called 
`main.handlebars`, so first create directory called layouts in the views folder like so `mkdir views/layouts`
. Then create the file add template a basic code template like this 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />  
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <link rel="stylesheet" type="text/css" href="./style.css" />
  </head>
  <body>
    {{{body}}}
  </body>
</html>

```

13. Now in the **views** folder create a basic home file named `home.hbs` and add simple html like so .
Also it is important to create a `views/error/500.hbs`, if you run node it will state that this file does not exist

```html
<p> Hello, {{name}} </p>

<!-- Inside the 500.hbs -->
<p> Error 500</p>
```

14. In the controller change the home method to *res.render* as opposed to *res.send* like so 

```js

// The old way
route.get("/", (req,res) => {
  res.send("this is the home page");
})

//The way to render files
route.get("/", (req,res) => {
  const data = {
    name: "Jermaine Forbes"
  }

  res.render("home",data); // The home file will render: Hello, Jermaine Forbes
})

```

15. Now create a separate controller file called `mvc/controllers/homeController.js` and add the function
that is in callback function that is in the `router.js` file to this new file like so.

```js
// Inside homeController.js

module.exports.page = (req, res) => { 

  const data = {
    name: "Jermaine Forbes"
  }

  res.render("home",data); // The home file will render: Hello, Jermaine Forbes
}

```

16. In the **router.js** file require the homeController and it into the second parameter like so

```js
const express  = require('express');
const route = express.Router();
const home = require("../controllers/homeController");


route.get("/",home.page)

module.exports = route;


```

17. 




</details>

[go back :house:][home]

### how to use process.env

<details>
<summary>
View Content
</summary>

  If you need to store environment variables like port numbers, passwords, or database connections then this
  is what you need to follow

:link: **Reference**

- [Working with Environment Variables in Node.js](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)
---

1. first install **dotenv**


```js
npm install dotenv --save
```

2. create a .env file to add your environment variables like so

```
 vim .env
```



```js
// inside .env

PORT=8000
PASSWORD="password"
USERNAME="username"
DATABASE="DB"
```

3. in your node application make sure you require **dotenv** and then call the method **config**


```js
// inside server or app.js
require("dotenv").config()

```

4. after that you should be able to call the environment variables in any page


```js
console.log(process.env.PORT) // should output 8000
```

</details>

[go back :house:][home]

### how to upgrade nvm

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [How to properly upgrade node using nvm](https://stackoverflow.com/questions/34810526/how-to-properly-upgrade-node-using-nvm)
---


```js
nvm install node --reinstall-packages-from=node
```

</details>

[go back :house:][home]
