/* Requires */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const productsList = require('./products.json');
const tools = require('./tools.js');

/* Easier Path for using with __dirname */
const path = require('path');

const app = express();

/* App Usings */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

/* Local Variables */
app.use(function(req, res, next){
  res.locals.botResponse = '';
  res.locals.userResponse = '';
  next();
});

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    welcomeMessage : 'Hello! Welcome to Grover chat!',
    introMessage: 'In this chat you could ask for any product name (listed below) and I could give you the subscription price for it.',
    products : productsList
  });
});

app.post('/userResponse/send', (req, res) => {
  var newUserResponse = {
    userMessage : req.body.userMessage
  };
  tools.recordNewMessage(newUserResponse);
  botResponse = tools.checkUserResponse(newUserResponse.userMessage, productsList);
  res.render('index', {
    welcomeMessage : 'Hello! Welcome to Grover chat!',
    introMessage: 'In this chat you could ask for any product name (listed below) and I could give you the subscription price for it.',
    products : productsList,
    userResponse: newUserResponse.userMessage,
    botResponse : botResponse
  });
});

app.listen(3000, () => console.log('Server running on port 3000!'));
