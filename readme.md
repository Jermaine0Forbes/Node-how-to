# How to Node.js

- [how to use process.env][env]
- [how to upgrade node with nvm][upgrade-nvm]
- [how to set up a basic node.js application][setup-node]
- [how to setup react with webpack ][setup-wp]
- [nodemon: port 3000 is already in use app crashed][nodemon-crashed]
- [how to setup jest with react][jest-react]

[jest-react]:#how-to-setup-jest-with-react
[nodemon-crashed]:#nodemon-port-3000-is-already-in-use-app-crashed
[setup-wp]:#how-to-setup-react-with-webpack[setup-wp]
[setup-node]:#how-to-set-up-a-basic-nodejs-application
[home]:#how-to-nodejs
[env]:#how-to-use-processenv
[upgrade-nvm]:#how-to-upgrade-nvm

### how to setup jest with react

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [How to test React with Jest](https://www.robinwieruch.de/react-testing-jest)
---

I'm going to assume that you already installed react and got a react app up and running

1. So first install jest

```
npm i -D jest
```
2. Now in the package.json, add this in the *scripts* section. This will allow you to run jest with any
cofigurations that you are going to put in the `jest.config.js`

```json
{
  ...
  "scripts": {
    "start": "webpack serve --config ./webpack.config.js --mode development",
    "test": "jest --config jest.config.js",
    "test:watch": "npm run test -- --watch",
  },
  ...
}
```

3. Now let's `vim jest.config.js` and add this necessary code to look for any js files that might have the *spec* extension

```js
module.exports = {
  "testRegex": "((\\.|/*.)(spec))\\.js?$"
}
```

4. If you have not installed babel libraries that are needed for jest, here is the time to do so

```
 npm i -D @babel/preset-env @babel/preset-react
```

5. Next, let's create a `babel.config.js` file in order to make sure jest does not throw any errors when you add JSX in
your testing files. Add code like so 

```js
module.exports = {presets: ['@babel/preset-env','@babel/preset-react']}

```

6. Now if you already have an App.js file, create a *App.spec.js* file and add code like so. This will be a general
 assertion to just to see if jest is running.

```js
import React from "react";


describe('My Test Suite', () => {
  it('should show my first test', () => {
    expect(true).toEqual(true);
  });
});

```

7. Now run `npm run test`, jest should start running and the result should pass.

</details>

[go back :house:][home]


### nodemon: port 3000 is already in use app crashed

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [stackoverflow](https://stackoverflow.com/questions/58605392/port-3000-is-already-in-use-nodemon-app-crashed-waiting-for-file-changes-bef)
---

Basically this error message would happen when nodemon tries to set the application to certain port ( in this case it's 3000), 
and the node application is still running on that port. Many times, the node application is still running even when you restart nodemon. 
So, the best thing to do is to install `kill-port` package that will allow you destroy the process based on the port number when you 
tell nodemon to restart or if nodemon crashes. This works sometimes but it don't work all the time

1. First install kill-port package

```
 npm i -D kill-port
```

2. Now create a nodemon.json, that will allow the options to kill/destroy the process with the specific port number. Add this code

```json
{
  "events": {
    "restart": "kill-port 3000",
    "crash": "kill-port 3000"
  },
  "delay": "1500"
}
```

3. Now you can run `nodemon index.js` or whatever command you run and it should be able to run and kill processes when nodemon
restarts or crashes

</details>

[go back :house:][home]


### how to setup react with webpack

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [How to setup React with Webpack](https://levelup.gitconnected.com/how-to-setup-a-react-application-with-webpack-f781b5c4a4ab)
---

1. First install react & webpack libraries

```
npm i react react-dom ; npm i -D webpack webpack-cli
```

2. Next create a directory that will hold the react files. So in the terminal type `mkdir src` or whatever you want your folder to be named.
Then create the  **App.js** file, and add the basic code like so.

```js

import React from "react";

export default function App() {
  return <h1>Hello World</h1>;
}
```

3. Now, create the **index.js** file that will render the react file like so.

```js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));
```

4. Next install the babel loaders that will compile your react code so that can be used in the browser

```
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

5. Now it's time to create the webpack file. So you can  `vim webpack.config.js`, and add this code like so to your config file

```js

const path = require("path");
module.exports = {
  entry: "/src/index.js",
  output: { path: path.resolve(__dirname, "public/js/") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  mode: "development",
  watch:true,
};

```

6. Now in your package.json, add a webpack script that you can call when you do `npm run ...` like so

```
  "scripts": {
    "build": "webpack" // in the scripts property add this code
  },

```

7. So now you if put in the the terminal `npm run build`, webpack would be in watch mode and will compile your code
to the designated **output** property. So in this example it would be `public/js/main.js`. If you want to change the 
name of the output file you have to add the  **filename** property inside the **output** object of the webpack object..


</details>

[go back :house:][home]



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

16. In the **router.js** file require the homeController and insert it into the second parameter
of the *get* method like so

```js
const express  = require('express');
const route = express.Router();
const home = require("../controllers/homeController");

// Doing this will make the code cleaner and easier to manage routes
// That are specific a page or controller
route.get("/",home.page)

module.exports = route;


```

17. Next, we need to set up a model to CRUD any data. So first you need to setup mongodb on your server, [here](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04) is 
a guide to do it in ubuntu. After your mongo has been set up, install mongoose like so.

```
npm i mongoose
```

18. In your `./mvc/models` directory create a `schema.js` and a `db.js`. The schema file is for you to define
the models/documents fields that are required when you make any changes to them. And the **db** file is to connect
to your mongodb so that when you make a CRUD change it will be saved into mongodb. Here is an example


#### In schema.js 

```js

const goose = require('mongoose');
const schema = goose.Schema;

// Defines a user schema
const user = new schema({
    username: String,
    password: String,
    
}, {
 timestamps:true
});


goose.model("Users", user);
```

#### In db.js 

```js
const goose = require('mongoose');
const db = goose.connection;
const dbURI = 'mongodb://localhost/test';
const settings = { useNewUrlParser: true,  useUnifiedTopology: true  };
goose.connect(dbURI, settings);

db.on('connected', function(){
    console.log("database connected");
});

db.on('error', function(err){
    console.log(err)
});

db.on('disconnected', function(){
    console.log("database disconnected");
});

// Make sure you put the schema file 
// at the bottom of the db file. I'm not sure why
// I assume after a connection has been made it will
// create the model and attach it to mongoose
require('./schema')

```

19. Now, we want to create a simple form that can save user information. So in the `./mvc/views/home.hbs`
file we want to add in a form like so. 

**Note**: this form is using classes from Bootstrap 4.  So if you want it to look exactly like this you have to 
get the styles from there

```html
<div class="container">
    <p>Hello {{name}}</p>

    <form action='/store/user' method='POST' >
    <div class="mb-3 col-4">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control " name="username" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3 col-4">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control " name="password" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</div>
```

20. Lastly, *require* the path to the db file in the `app.js` like so. This will allow the mongod database to connect on startup of the app

```js
// In app.js require the file like so

require("./mvc/models/db");
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const path = require('path');
const app = express();
...
```

21. The last thing we need to do is to set up a route  that will store the information that would 
be set in the form. The action at this moment has `/store/user`. So we need to create an endpoint that 
would catch the information the form is sending. So in the *homeController* file add this code in order to store the user's information

```js
const goose = require("mongoose");
const User = goose.model('Users')

module.exports.home = (req, res) => {

    res.render("home", {name:'Jermaine Forbes'});
}

module.exports.storeUser = (req , res) => {
    User.create(req.body, (err, data) =>{

      //if there was any type of error, they will the error message
        if(err) return res.send(err)

      //if there is no error, then it output the data into the console, and send a message that the information has been saved
        console.log(data)
        res.send("Information has been saved")

    })

}

```

22. Now, go back into the **route.js** file to create the end point of `store/user`.

```js
const express  = require('express');
const route = express.Router();
const ctr = require("../controllers/homeController");


route.get("/",ctr.home)

// Now when the form is submitted it will store the new user information and send you a message
route.post("/store/user",ctr.storeUser)


module.exports = route;

```


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
