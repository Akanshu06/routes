const { log } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/login', (req, res) => {
    res.send(`
        <form action="/main" method="get" 
        onsubmit="localstorage.setItems('username' document.getElementById('username').value)">
            <input type="text" name="username" id="username" placeholder="Enter your username" required>
            <input type ="hidden" name="message" id="message">
            <button type="submit">Login</button>
        </form>
    `);
});

router.get('/main',(req,res,err)=>{
   res.send('mainPage');
})

router.post('/',(req,res,)=>{
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const messagebody = Buffer.concat(body).toString();
      console.log(messagebody);
      fs.writeFileSync("message.txt", messagebody);
      res.write(`<html>${messagebody}</html>`);
    });

    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile('message.text',`${req.body.username}:${req.body.message}`, (err)=>{
        err? console.log(err): res.redirect('/');
    }) ;

})

router.post('/', (req, res, next) => {
    res.send(`
        <form action="/" method="post" 
        onsubmit="localStorage.setItem('username',document.getElementById('username').value)">
        <input type="text" name="username" id="username">
        <button type="submit">Send</button>
        </form>
    `);
});

module.exports = router;
