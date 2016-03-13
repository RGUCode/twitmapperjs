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
    db.collection('tweets').count({}, function(error, numOfDocs) {
      total = numOfDocs;
    });
      var queryObject = url.parse(request.url,true).query;
      //console.log(queryObject);ls
       response.writeHead(200, { "Content-Type": "text/plain" });
       //response.write(util.inspect(queryObject));
       db.collection('tweets').find({}, function(err, records) {
         if(err) {
           console.log("There was an error executing the database query.");
           response.write("this totally hasn't worked");
           response.end();
           return;
         }
         //response.write(queryObject['search']);

         i = records.length;
         var html = '<h2>'+i+' Records of '+total+' </h2>';
         while(i--) {
           html += '<p><b>Name:</b> '
           + records[i].user.name
           + ' <br /><b>Text:</b> '
           + records[i].text;
         }
         response.write(html);
         response.end();
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
