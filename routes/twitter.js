var express = require('express');
var router = express.Router();
var Twitter = require('twitter')

router.get('/:action', function(req, res, next) {
  var actions= ['timeline','search']
  var action = req.params.action

  if(actions.indexOf(action)==-1){
    res.json({
      confirmation: "fail",
      message: 'improper action'
    })
    return
  }

  var client = new Twitter({
  consumer_key: 'RsW3R1A8uftKNmK6bE3WaXs40',
  consumer_secret: 'ovLHXHWUhCaxQ3HggcZCyGiFmEDTP235JKirpjQe41xzB1cXpr',
  access_token_key: '369140164-4rxncxA0pQDkm4pkhFKSHAi9XTnMA8hEVidHIWQI',
  access_token_secret: 'isyJuItFBWy7YUTHuiz2LjCtwNqtGSjn77DfF1SLsbyyO'
  });

	var params = {}
	var url = null
	if (action == 'timeline'){
		params['screen_name'] = req.query.username
		url = 'statuses/user_timeline'
	}
	else if (action == 'search'){
		params['q'] = req.query.term
		url = 'search/tweets'
	}

	client.get(url, params, function(error, tweets, response) {
	  if (error == null) {
	    console.log('hello')
	  }

    var tweetUrl = "../../images/retweet.png"
    var list = (tweets.statuses == null) ? tweets : tweets.statuses
    var photo = (tweets.statuses == null) ? tweets[0].user.profile_image_url : tweets.statuses[0].user.profile_image_url
    var tag =(tweets.statuses == null) ? 'Search for Username:' : 'Search for Subject:'
    var title = (action == 'timeline') ? params['screen_name'] : params['q']
		var content = {
			title:'@' + title,
			tweets: list,
      photo: photo,
      tag:tag
		}
    // console.log('this is a photo' + photo)

		var format = (req.query.format == null) ? 'html' : req.query.format
		if(format==null){
			format='html'
		}
		if (format == 'json'){
			res.json(tweets)
		}else {
			res.render('twitter', content)
		}
	})
})

module.exports = router
