# Template

## Pug

- [how to setup pug to work with node][setup-pug]
- [how to enable layouts][pug-layout]
- [how to include other files][inc-pug]

## Handlebars

- [how to create partials][hbs-partials]
- [Access has been denied to resolve the property “from” because it is not an “own property” of its parent][err-hbs-1]

[err-hbs-1]:#access-has-been-denied-to-resolve-the-property-from-because-it-is-not-an-own-property-of-its-parent
[hbs-partials]:#how-to-create-partials-in-hbs
[inc-pug]:#how-to-include-other-files
[pug-layout]:#how-to-enable-layouts-in-pug
[setup-pug]:#how-to-setup-pug-to-work-with-node
[home]:#template



### Access has been denied to resolve the property "from" because it is not an "own property" of its parent

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [Handlebars: Access has been denied to resolve the property “from” because it is not an “own property” of its parent](https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is)
- [Faster Mongoose Queries With Lean](https://mongoosejs.com/docs/tutorials/lean.html)
- [github](https://github.com/handlebars-lang/handlebars.js/issues/1642)
---

If you try to get data from mongoose and try to output the data in handlebars it will show because the data is encapsulated in a mongoose object. 
So the best way to retrieve the data that will give handlebars direct access to it, is to convert the data into regular javascript object literals.
And that is what the **lean** method does within mongoose. It transforms the mongoose objects into regular javascript objects like so.

```js
dbName.find({}).lean()
  // execute query
  .exec(function(error, body) {
     //Some code
  });
```

</details>

[go back :house:][home]



### how to create partials in hbs

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [stackoverflow](https://stackoverflow.com/questions/16385173/node-js-express-handlebars-js-partial-views)
---

Within app.js, just before you set the view engine. Initialize  the handlebars method and enter the path to where the partials directory should be 
located. You can also enter in other options within the method like so.

```js


app.engine('hbs',hbs({
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/mvc/views/layouts/',
    partialsDir: __dirname + '/mvc/views/partials/'// this is where you define the path to where partials will be located
}));
app.set("view engine","hbs"); // sets the name  of the view engine that is going to be used
app.set("views",path.join(__dirname,"mvc/views")); // setting the views path

...

```

</details>

[go back :house:][home]


### how to include other files

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [pugjs](https://pugjs.org/language/includes.html)
---

If you want to include files, and you already set up pug to allow different layouts to be used. 
All you have to do is add the **include** keyword followed by the path to the file you want to 
include. Also, it might be important to add the comment of the name of the file for every. I cannot
confirm if it is required or not.

**In the layout file**

```pug
 //- layout.pug
doctype html
html(lang='en')
  head
    link(href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous")
    script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous")
    title My Site - Pug!

  body(class="bg-light")
    //- This is the include file
    include ../header/header-main.pug
    block content
    footer 
```

**In the header-main file**

```pug

header 
    nav(class="nav border bg-white")
        a(class="nav-link active" aria-current="page" href="/") Home
        a(class="nav-link" href="/users") Users
        a(class="nav-link" href="/chat") Chat
        a(class="nav-link" href="#" tabindex="-1" aria-disabled="true") Disabled

```

I'm pretty sure that's all you have to do as long as you have the path to the views set and the layouts also set in app/index.js

</details>

[go back :house:][home]


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
