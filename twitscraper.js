var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var Twitter = require('twitter');
var counter = 0;

var client = new Twitter({
  consumer_key: 'KXdzujUy8NHjC1h2obqNPtMVL',
  consumer_secret: '7f24ZangnSfEx14iJ1MsghO5AuoHHZJHTLiazNiznthdTfuKJE',
  access_token_key: '14812487-06dGq8Lr1VkKZS21iuuZ0tr36tg5oi9yycWFcjpnV',
  access_token_secret: 'fFFOlemWQbnS7n56rtppDLR0TCy4zrrgmheL81abj6vA2',
});
//console.log(consumer_key +" : "+ consumer_secret +" : "+ access_token_key +" : "+ z)
/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {track: 'bremain, brexit'},  function(stream){
  stream.on('data', function(tweet) {
      db.collection('tweets').insertOne(tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
