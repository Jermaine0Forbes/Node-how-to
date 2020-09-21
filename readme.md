# How to Node.js

- [how to use process.env][env]
- [how to upgrade node with nvm][upgrade-nvm]


[env]:#how-to-use-process-env
[upgrade-nvm]:#how-to-upgrade-nvm


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
