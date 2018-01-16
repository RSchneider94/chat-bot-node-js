/*******************************************************************
* Entry application file. This file handles the application at all *
* based in ExpressJS framework with Node.JS                        *
 *******************************************************************/


/* Requires */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
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

/* Global Arrays to store responses */
const arrUserResponses = [];
const arrBotResponses = ['In this chat you could ask for any of our products and I will give you the subscription price for it. Type "list" for a list of products.'];


//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    chatTitle : 'Customer Service Chat',
    botResponse : arrBotResponses
  });
});

app.post('/userResponse/send', (req, res) => {
  //stores the user's response from form
  var newResponseUserInput = req.body.userMessage;
  arrUserResponses.unshift(newResponseUserInput);
  //record the user message in a file
  tools.recordNewMessage(newResponseUserInput);
  //stores the bot's response
  botResponse = tools.checkUserResponse(newResponseUserInput);
  arrBotResponses.unshift(botResponse);
  res.render('index', {
    chatTitle : 'Customer Service Chat',
    userResponse: arrUserResponses,
    botResponse : arrBotResponses
  });
});

app.listen(3000, () => console.log('Server running on port 3000!'));
