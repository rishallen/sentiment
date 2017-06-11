var key = require('/js/key.js');
var SentimentV1 = require('https://gateway.watsonplatform.net/natural-language-understanding/api/v1');

var mood = {
  //the attribute(analysis) holds the function
  analysis: function() {
    var sentiment_analyzer = new ToneAnalyzerV3({
      username: key.username,
      password: key.password,
      version: 'v1',
      version_date: '2017-02-27',
});

  sentiment_analyzer.mood({
    text: 'A word is dead when it is said, some say. Emily Dickinson'
  },
  function(err, mood) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(mood, null, 2));
  });
}
};
// when you require this file, you get the emotion object with the analysis function in it



module.exports = services;
