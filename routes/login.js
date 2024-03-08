const express = require('express');
const router = express.Router();

// Route for displaying the login form
router.get('/', (req, res) => {
    res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/main" method="GET">

	<input id="username" type="text" name"title">

	<button type="submit">add</button>

</form>
    `);
    
});
// Route for handling the login form submission
router.post('/', (req, res) => {
    const { username } = req.body;
    // Store username in localStorage
    console.log(username);
});

module.exports = router;
