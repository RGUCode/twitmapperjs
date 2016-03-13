//Lets require/import the HTTP module
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoURL = 'mongodb://localhost:27017/test';
var fs = require('fs');
var http = require('http');
var url = require('url') ;

//Lets define a port we want to listen to
const PORT=4040;

//We need a function which handles requests and send response
function handleRequest(request, response){
  MongoClient.connect(mongoURL, function(err, db) {
    db.collection('tweets').count({}, function(error, numOfDocs) {
      var queryObject = url.parse(request.url,true).query;
      //console.log(queryObject);ls

       response.writeHead(200);
       response.write(""+queryObject);
       response.end('I have '+numOfDocs+' documents in my collection');
    });
  });
};

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
