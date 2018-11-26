var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', null);
});

router.post('/:page', function(req, res, next) {
  var query = req.body.query;
  var type = req.body.type; // search or timeline
  var term = req.body.term;
  var location = req.body.location;
  // console.log("YELP: " + JSON.stringify(req.body.term))
  if (location != null) {
    if (location.indexOf(' ') >= 0) {
      location = location.replace(' ', '+');
      console.log('NEW LOCATION: ' + JSON.stringify(location));
    }
  }

  if (term != null) {
    if (term.indexOf(' ') >= 0) {
      term = term.replace(' ', '+');
      console.log('NEW TERM: ' + JSON.stringify(term));
    }
  }

  console.log('YELP: ' + JSON.stringify(term) + ' ' + JSON.stringify(location));
  var url = null;
  if (type == 'search') {
    url = '/twitter/search?term=' + query;
  }
  if (type == 'timeline') {
    url = '/twitter/timeline?username=' + query;
  }
  if (term != null && location != null) {
    url = '/yelp?term=' + term + '&location=' + location;
  }

  res.redirect(url);
});

module.exports = router;
