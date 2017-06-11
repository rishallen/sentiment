'use strict';
// require('app-module-path').addPath(baseDir);
// var services = require('/js/services')
// var key = require('js/key');

//Executes when the Document Object Model (DOM) is ready for JavaScript code
$(document).ready(function(){
  var Sentiment = { //jQuery objects, DOM nodes stored in variables bc they will be used more then once, much faster
    $content: $(' .content'),
    $form: $('form'),
    userInput: '', // is a string and is set as the input from the user
    toggleLoading: function(){
        // Toggle loading indicator
        this.$content.toggleClass('content--loading');

        // Toggle the submit button so we don't get double submissions
        // http://stackoverflow.com/questions/4702000/toggle-input-disabled-attribute-using-jquery
        this.$form.find('button').prop('disabled', function(i, v) { return !v; });

      }
    };

  console.log("main.js is running");

    Sentiment.$form.on('submit', function(e) {
      e.preventDefault();
      Sentiment.toggleLoading();
      Sentiment.userInput = $(this).find('input').val();
      // var sentenceValid = Sentiment.userInputIsValid;
      var sentenceValid = true;

      if( sentenceValid ) {
        $.ajax({
          url: "http://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27",
          username: "4ebdf647-1220-41ec-9bd7-b73f3f6f2c5f",
          password: "0mVG8rqeyTcH",
          type: 'POST',
          contentType: 'application/json',
          dataType: "text",
          data: {
            "text": Sentiment.userInput,
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
          },
          success: function(data) {
            console.log(data);
          },
          error: function() {
            console.log("error");
          },
          xhrFields:
          {
              withCredentials: true
          },
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + btoa("4ebdf647-1220-41ec-9bd7-b73f3f6f2c5f" + ":" + "0mVG8rqeyTcH"));
          }
        });
      }
      // end of on submit instructions
    });
    console.log("end of document ready");
});

// module.exports = main;
          // $.post(
          //   "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27",
            // {
            //   "text": Sentiment.userInput,
            //   "features": {
            //     "entities": {
            //       "emotion": true,
            //       "sentiment": true,
            //       "limit": 2
            //
            //     },
            //     "keywords": {
            //       "emotion": true,
            //       "sentiment": true,
            //       "limit": 1
            //     }
            //   }
            // },
          //   function(data, status) {
          //     console.log(data);
          //     console.log(status);
          //   }
          // );


          //     username: "4ebdf647-1220-41ec-9bd7-b73f3f6f2c5f",
          //     password: "0mVG8rqeyTcH",
          // })
          // .done(function(response) {
          //
          //     // Get the first response and log it
          //     var response = response.results[0];
          //     console.log(response);
          //
          //     // Check to see if request is valid & contains the info we want
          //     // If it does, render it. Otherwise throw an error
          //     if(response && response.artworkUrl512 != null){
          //         Sentiment.render(response);
          //     } else {
          //         Sentiment.throwError(
          //             'Invalid Response',
          //             'The request you made appears to not have an associated icon. <br> Try a different URL.'
          //         );
          //     }
          // })
          // .fail(function(data) {
      //         Sentiment.throwError(
      //             'iTunes API Error',
      //             'There was an error retrieving the info. Check the iTunes URL or try again later.'
      //         );
      //     });
      // } else {
      //     Sentiment.throwError(
      //         'Invalid Link',
      //         'You must submit a standard iTunes store link with an ID, i.e. <br> <a href="https://itunes.apple.com/us/app/twitter/id333903271?mt=8">https://itunes.apple.com/us/app/twitter/<em>id333903271</em>?mt=8</a>'
          // );
    //   }
