/*******************************************************************
* Entry application file. This file handles the application at all *
* based in ExpressJS framework with Node.JS                        *
 *******************************************************************/


// Requires
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const tools = require('./tools.js');

// Easier Path for using with __dirname
const path = require('path');

// App Init
const app = express();

// App Usings
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// Global Array to store responses
const arrGroupedResponses = ['Bot says: Hello!<br><br>In this chat you could ask for any of our products and I will give you the subscription price for it. Type "list" for a list of products. You could also type "categories" and type a brand, e.g: Apple'];

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render Index
app.get('/', (req, res) => {
  res.render('index', {
    arrGroupedResponses : arrGroupedResponses
  });
});

// POST from form
app.post('/userResponse/send', (req, res) => {
  // Stores the user's response from form
  let newResponseUserInput = req.body.userMessage;
  arrGroupedResponses.push('You says: ' + newResponseUserInput);
  // Stores the bot's response
  botResponse = tools.checkUserResponse(newResponseUserInput);
  arrGroupedResponses.push(botResponse);
  // Record messages in a file
  tools.recordNewMessage(arrGroupedResponses);
  res.render('index', {
    arrGroupedResponses: arrGroupedResponses
  });
});

// Server start
app.listen(3000, () => console.log('Server running on port 3000!'));
