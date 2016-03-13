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
//We need a function which handles requests and send response
function handleRequest(request, response){
  MongoClient.connect(mongoURL, function(err, db) {
    assert.equal(null, err);
    findTweets(db, function() {
      db.close();
    });
  });
};


var findTweets = function(db, callback) {
   var cursor =db.collection('tweets').find( );
   var html = '<h2> Results </h2>';
   cursor.each(function(err, tweet) {
      assert.equal(err, null);
      if (tweet != null) {
         console.dir(tweet);
         html += '<p><b>Name:</b> '
         + records[i].user.name
         + ' <br /><b>Text:</b> '
         + records[i].text;
      } else {
         callback();
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
