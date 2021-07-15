# Template

## Pug

- [how to setup pug to work with node][setup-pug]
- [how to enable layouts][]
- [how to include other files][]


[setup-pug]:#how-to-setup-pug-to-work-with-node
[home]:#template


### how to setup pug to work with node

<details>
<summary>
View Content
</summary>

:link: **Reference**
- [using template engines with express](https://expressjs.com/en/guide/using-template-engines.html)
---

1. First install pug library

```
npm i pug --save
```

2. Now just add the `app.set()` method in your index file like so 

```js
var express = require('express');
var body = require('body-parser');
var cookie = require('cookie-parser');
var path = require('path');
var app = express();
var ip =  process.env.IP || 'localhost'; 
var cors = require("cors");
var port = process.env.PORT || 3001;
var routes = require('./mvc/routes/router')
require('dotenv').config();


app.use(cors());
app.set("view engine","pug");// this is only method you need to set to get pug to run
app.set("views",path.join(__dirname,"mvc/views")); // also you need set the views path as well
app.use(express.static(path.join(__dirname,'public')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

app.use("/", routes);

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

3. Honestly, that's about it. I was surprised it was that easy

</details>

[go back to table of contents][home]
