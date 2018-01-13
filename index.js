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

/* Global Arrays to store responses */
const arrUserResponses = [];
const arrBotResponses = [];

app.post('/userResponse/send', (req, res) => {
  //stores the user's response from form
  var newResponseUserInput = req.body.userMessage;
  arrUserResponses.push(newResponseUserInput);
  //record the user message in a file
  tools.recordNewMessage(newResponseUserInput);
  //stores the bot's response
  botResponse = tools.checkUserResponse(newResponseUserInput, productsList);
  arrBotResponses.push(botResponse);
  res.render('index', {
    welcomeMessage : 'Hello! Welcome to Grover chat!',
    introMessage: 'In this chat you could ask for any product name (listed below) and I could give you the subscription price for it.',
    products : productsList,
    userResponse: arrUserResponses,
    botResponse : arrBotResponses
  });
});

app.listen(3000, () => console.log('Server running on port 3000!'));
