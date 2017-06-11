
// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

//bodyParser.urlencoded(options)
 // * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 // * and exposes the resulting object (containing the keys and values) on req.body
app.use(bodyParser.urlencoded({ extended: true }));

// route our app
var router = require('./app/routes');
app.use('/', router);


//bodyParser.json(options)
 // * Parses the text as JSON and exposes the resulting object on req.body.
// app.use(bodyParser.json());
//
// app.post('/', function(request, response) {
//   console.log(request.body.response);
//   res.send()
// });

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// app.all('*', function(req, res, next){
//   fs.readFile('posts.json', function(err, data){
//     res.locals.posts = JSON.parse(data);
//     next();
//   });
// });

// start the server
app.listen(port, function() {
  console.log('app started');
});
