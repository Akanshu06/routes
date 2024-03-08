const express = require('express');
const bodyParser = require('body-parser');
const loginPage = require('./routes/login.js');
const messagePage = require('./routes/message');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));


app.use('/user', loginPage);
//app.use('/main',(req,res)=>{
//    res.send('its a main page')
// })
app.use('/main',messagePage);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
