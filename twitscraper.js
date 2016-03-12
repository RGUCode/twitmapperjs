var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'KXdzujUy8NHjC1h2obqNPtMVL',
  consumer_secret: '7f24ZangnSfEx14iJ1MsghO5AuoHHZJHTLiazNiznthdTfuKJE',
  access_token_key: '14812487-06dGq8Lr1VkKZS21iuuZ0tr36tg5oi9yycWFcjpnV',
  access_token_secret: 'fFFOlemWQbnS7n56rtppDLR0TCy4zrrgmheL81abj6vA2',
});
console.log(consumer_key +" : "+ consumer_secret +" : "+ access_token_key +" : "+ z)
/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {track: 'twitter'},  function(stream){
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
