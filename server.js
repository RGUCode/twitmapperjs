//Lets require/import the HTTP module
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


//Lets define a port we want to listen to
const PORT=4040;

//We need a function which handles requests and send response
function handleRequest(request, response){
  MongoClient.connect(url, function(err, db) {
    collection.count({}, function(error, numOfDocs) {
      console.log('I have '+numOfDocs+' documents in my collection');

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
