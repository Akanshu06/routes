const express = require('express');
const router = express.Router();
const fs = require('fs');

// Route for displaying the message form
router.get('/', (req, res) => {
    res.send(`
    <form action="/main" method="post" onsubmit="updateUsername()">
    <input type="text" name="message" id="message">
    <input type="hidden" name="username" id="username">
    <button type="submit">Send</button>
</form>

<script>
    function updateUsername() {
        // Retrieve username from localStorage
        const username = localStorage.getItem('username');
        // Set the value of the hidden input field
        document.getElementById('username').value = username;
        // Store the message in localStorage
        const message = document.getElementById('message').value;
        localStorage.setItem('message', message);
    }
</script>

    `);
});

// Route for handling the message form submission
router.post('/', (req, res) => {
    // Store username in localStorage
    console.log(`${req.body.username}:${req.body.message}`);
    
    // Store message in file
    fs.writeFileSync('message.txt', `${req.body.username}:${req.body.message}`, {flag:'a'},(err)=>{
        console.log((err));
    });
    // Display user message
    //res.send(`${req.body.username}:${req.body.message}`);
    fs.readFile("message.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log('data from file' + data);
            res.send(`<html><body>${data}</body></html>`);
        }
    });
    res.redirect('/main')
});

// Read data from file and display

  
module.exports = router;
