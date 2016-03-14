//Lets require/import the HTTP module
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoURL = 'mongodb://localhost:27017/test';
var fs = require('fs');
var http = require('http');
var url = require('url') ;
var util = require("util");

//Lets define a port we want to listen to
const PORT=4040;
var itemsProcessed = 0;
var total =0;
var queryData;
//We need a function which handles requests and send response
function handleRequest(request, response){
  queryData = url.parse(request.url, true).query;
  MongoClient.connect(mongoURL, function(err, db) {
    assert.equal(null, err);
    searchTweets(db, function(html) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
      db.close();
    });
  });
};


var findTweets = function(db, callback) {

   var cursor =db.collection('tweets').find({"hashtags":queryData.search} );
   var html = '<h2> Results '+queryData.search+' </h2>';
   cursor.each(function(err, tweet) {
      assert.equal(err, null);
      if (tweet != null) {
         //console.dir(tweet);
         html += '<p><b>Name:</b> '
         + tweet.user.name
         + ' <br /><b>Text:</b> '
         + tweet.text;
      } else {
         callback(html);
      }
   });
};

var searchTweets = function(db, callback) {
   var cursor =db.collection('tweets').runCommand("text".{search: queryData.search })
   var html = '<h2> Results '++' </h2>';
   cursor.each(function(err, tweet) {
      assert.equal(err, null);
      if (tweet != null) {
         //console.dir(tweet);
         html += '<p><b>Name:</b> '
         + tweet.user.name
         + ' <br /><b>Text:</b> '
         + tweet.text;
      } else {
         callback(html);
      }
   });
};

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
