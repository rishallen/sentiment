// require express
var express    = require('express');
var path       = require('path');
var es6        = require('es6-promise').polyfill();
var isomorphic = require('isomorphic-fetch');

// create our router object
var router     = express.Router(); //server side, incoming requests

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
    var someText = "GET GET GET"
    res.render('pages/home', {hello: "hello"});
  });

router.post('/', function(req, res) {
  console.log("The form submitted, yay!!", req.body.userInput);

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
          "limit": 10
        }
      }
    })
  })
  .then(function(response) { //callback
    return response.json(); // json is a promise
  })
  .then(function(bodyJson) { // this is the promise result
    console.log('response json', bodyJson); //this prints the response to the terminal, not the actual app  (server side)

    const keywordObjects = bodyJson.keywords
    let emotionsArray = [];
    for(var i=0; i < keywordObjects.length; i++) {
      emotionsArray.push(keywordObjects[i].emotion);
    };

    var makeSumDict = function(arr) {
      let totalEmotionsDict = {};
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        for (let key in obj) {
          if(key in totalEmotionsDict) {
            totalEmotionsDict[key] += obj[key];
          } else {
            totalEmotionsDict[key] = obj[key];
          }
        }
      }
      return totalEmotionsDict;
    };

    const getHighestEmotion = function(emotionsTotals) {
      let highestSum;
      let highestSumKey;
      for(let key in emotionsTotals) {
        if (highestSum === undefined) {
          highestSum = emotionsTotals[key];
          highestSumKey = key;
        } else {
          if (highestSum < emotionsTotals[key]) {
             highestSum = emotionsTotals[key];
             highestSumKey = key;
          }
        }
      }
      return highestSumKey;
    };

    const getAffirmationForEmotion = function(highestEmotion) {
      const affirmationDict = {
        "sadness": ["Love", "Exceptance", "Let it Go", "Tolerance", "Peace"],
        "joy":     ["Sun", "keep going", "Your on track", "vortex", "love is yours"],
        "fear":    ["do it anyway", "illusions", "scarey", "me too", "stop it"],
        "disgust": ["shower", "stop judging", "meditate", "wow", "judgemental are you?"],
        "anger":   ["simmer down", "punch something", "hot head", "yoga", "scream"]
      };

      const affirmationArray = affirmationDict[highestEmotion];
      // min 0 max length-1
      return affirmationArray[Math.floor(Math.random() * affirmationArray.length)];
    };


    const emotionsTotals = makeSumDict(emotionsArray);
    const highestEmotion = getHighestEmotion(emotionsTotals);
    const affirmation    = getAffirmationForEmotion(highestEmotion);


    res.render('pages/home', {affirmation: affirmation}); //the html is being rendered to the browser
  })
  .catch(function(error) {
    console.log('Request failure: ', error)
  });
});
