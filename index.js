var Twitter = require('twitter');

var config = require('./config');
var client = new Twitter(config.twitter.oauth);

var messages = ['Hey @RAHomes, why is it so hard to get good customer service in Las Vegas?',
				'Oh when is @RAHomes going to fix my home issues that are under warrenty.  It has been over three months and no call backs.'];

function postTweet() {
	client.post('statuses/update', {status: messages[1]},  function(error, tweet, response) {
  		if(error) throw error;
  		console.log(tweet);  // Tweet body. 
  		console.log(response);  // Raw response object. 
	});
}

var query = 'make "great again" -america -usa -filter:retweets';
var query2 = '"hit em with the hein" -filter:retweets';
var rgx = /make .* great again/i;
var rgx2 = /hit em with the hein/i;

// Runs a Twitter search for the specified `query` and retweets all the results.
function searchAndTweet(succeed, fail) {
  console.log("search and tweet");
  client.get('search/tweets', {q: query, count: 15}, function(err, tweets, response) {
    if (!tweets.statuses) {
      fail(err);
    }

    tweets.statuses.forEach(function(tweet) {
      // Make sure we match the regex.
      var match = tweet.text.match(rgx);
      if (match) {
        var tweetId = tweet.id_str;
        client.post('statuses/retweet/' + tweetId, function(err, tweet, id) {
          // Will return an error if we try to retweet a tweet that we've already
          // retweeted.
          console.log(err || tweet.text);
        });
      } else {
        // consider doing something for no match
      }
    });
    succeed("success");
  });
}

function searchAndTweet2(succeed, fail) {
  console.log("search and tweet 2");
  client.get('search/tweets', {q: query2, count: 15}, function(err, tweets, response) {
    if (!tweets.statuses) {
      fail(err);
    }

    tweets.statuses.forEach(function(tweet) {
      // Make sure we match the regex.
      var match = tweet.text.match(rgx2);
      if (match) {
        var tweetId = tweet.id_str;
        client.post('statuses/retweet/' + tweetId, function(err, tweet, id) {
          // Will return an error if we try to retweet a tweet that we've already
          // retweeted.
          console.log(err || tweet.text);
        });
      } else {
        // consider doing something for no match
      }
    });
    succeed("success");
  });
}


// setInterval(function() {
//   postTweet(console.log, console.log);
// }, 5 * 60 * 1000);

//postTweet();
setInterval(function() {
	searchAndTweet(console.log, console.log);
  searchAndTweet2(console.log, console.log);
	}, 5 * 60 * 1000);