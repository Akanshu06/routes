// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Route for "/login" to display the login form
app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="post" 
        >
            <input type="text" name="username" id="username" placeholder="Enter your username" required>
            <input type ="hidden" name="message" id="message">
            <button type="submit">Login</button>
        </form>
    `);
});


// Route for "/login" to handle the login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;
    // Store username in localStorage
    console.log(username);
    res.send(`<script>window.localStorage.setItem('username', '${username}');window.location.href = '/main'</script>`);
});
app.get('/main',(req,res,err)=>{
    res.send('mainPage');
 })
// Route for "/" to display the message form and messages
// Route for "/" to display the message form and messages
app.get('/', (req, res) => {
    const username = req.query.username; // Retrieve username from query parameter
    const messages = fs.readFileSync('messages.txt', 'utf8').split('\n');
    res.send(`
        <h2>Welcome, ${username}!</h2>
        <form action="/" method="post">
            <input type="text" name="message" placeholder="Enter your message" required>
            <button type="submit">Send</button>
        </form>
        <h3>Messages:</h3>
        <ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul>
    `);
});

// Route for "/" to handle message form submission
app.post('/', (req, res) => {
    const { message } = req.body;
    const username = req.localStorage.getItem('username');
    fs.appendFileSync('messages.txt', `${username}: ${message}\n`);
    res.redirect('/');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
