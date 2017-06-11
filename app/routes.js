// require express
var express    = require('express');
var path       = require('path');
var es6        = require('es6-promise').polyfill();
var isomorphic = require('isomorphic-fetch');

// create our router object
var router     = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
    var someText = "GET GET GET"
    res.render('pages/home', {hello: "hello"});
  });

router.post('/', function(req, res) {
  console.log("The form submitted, yay!!", req.body.userInput);
  // var someText = "this is a test-- POSTED"
  // TODO: find the form data on the request object -- done
  // Objective one: console log the user input text

  // Objective two: set up a post (not ajax, there will be some other standard javascript request library)

  fetch("https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic NGI0MTUwY2ItY2U0My00NzAwLThlYzYtYjdmNjA1NmRkZjYzOldGd2JWYTI0Q1gzbw=='
    },
    body: JSON.stringify({
      "text": req.body.userInput,
      "features": {
        "entities": {
          "emotion": true,
          "sentiment": true,
          "limit": 2

        },
        "keywords": {
          "emotion": true,
          "sentiment": true,
          "limit": 1
        }
      }
    })
  })
  .then(function(response) { //callback
    // console.log('Response success: ', response.text());
    return response.json(); // json is a promise
  })
  .then(function(bodyJson) { // this is the promise result
    // console.log('response json', bodyJson); //this prints the response to the terminal, not the actual app
    //step 3. This is where I make the edited response

    // console.log(text);


    // before you render a response
    // process the data and decide what helpful text to send the userInput
    // then let that helpful text be sent in the render method below
    res.render('pages/home', {data: bodyJson});
  })
  .catch(function(error) {
    console.log('Request failure: ', error)
  });
});
