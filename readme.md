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

- first create a new folder and type npm init
- now install express `npm i express --save`
- now install dependencies that's needed 

```
 npm i  body-parser cookie-parser cors debug crypto dotenv
```
- create the index js file that is supposed to initialize the express app 

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

- add this code to add the dependencies that you've installed to get the app up and running 

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
- create an .env file to store your variables

```
 vim .env
```

```
DB_USERNAME="jermaine"
DB_PASSWORD=""
DB_PORT="5432"
PORT=1738
IP=123.123.123
DB_NAME="Test"
APP_ENV="development"
TOKEN_SECRET="9f0dc1da0366d17fa6902386c6475e75c71b0a8b09b2bae4cca27354ab304ef659b3baa212aed819a71abef7ff07e5d9ffb3be7e41004d4b9c9d33c809a535ec"
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
