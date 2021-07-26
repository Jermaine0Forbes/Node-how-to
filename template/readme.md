# Template

## Pug

- [how to setup pug to work with node][setup-pug]
- [how to enable layouts][pug-layout]
- [how to include other files][]


## Handlebars

- [how to create partials][https://stackoverflow.com/questions/16385173/node-js-express-handlebars-js-partial-views]


[pug-layout]:#how-to-enable-layouts-in-pug
[setup-pug]:#how-to-setup-pug-to-work-with-node
[home]:#template


### how to enable layouts in pug

<details>
<summary>
View Content
</summary>

:link: **Reference**
- [stackoverflow](https://stackoverflow.com/questions/5858218/how-can-i-render-inline-javascript-with-jade-pug)
---

It's a pretty simple code you have to implement to direct where your layout files are located  in the `app.js` file. And, then you have to extend the layout in the pug file you want like you will see in the example.

```js
// Within your app.js file make sure add the app.locals.basedir property
app.set("view engine","pug");
app.locals.basedir = path.join(__dirname,"mvc/views"); // setting the layout path
app.set("views",path.join(__dirname,"mvc/views")); 
app.use(express.static(path.join(__dirname,'public')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

```

1. Create your layout file 

```
  touch mvc/views/layouts/layout.pug
```

2. Add some code like this 

```html
//- layout.pug
doctype html
html(lang='en')
  head
    link(href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous")
    script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous")
    title My Site - Pug!

  body(class="bg-light")
    block content
    footer 

```

3. Now in the file that you want to extend the layout add the `extends` keyword followed by the path relative to the current file

```
//- index.pug
extends /layouts/layout.pug 

block content 
    div(class="container mt-3 bg-white")
        h1(class="text-center") Hello, from Pug Again!
        form(method="post" action="/store/user")
            div(class="mb-3")
                label(for="exampleInputEmail1" class="form-label") Email address
                input(type="email" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp")
                div(id="emailHelp" class="form-text") We'll never share your email with anyone else.
            div(class="mb-3")
                label(for="exampleInputPassword1" class="form-label") Password
                input(type="password" name="password" class="form-control" id="exampleInputPassword1" )

            button(type="submit" class="btn btn-primary") Submit
```

that's pretty much it.

</details>

[go back to table of contents][home]

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
