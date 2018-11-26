var express = require('express');
var router = express.Router();
// var Yelp = require('yelp');
const yelp = require('yelp-fusion');

/* GET home page. */

router.get('/', function(req, res, next) {
  // var yelp = new Yelp({
  //   consumer_key: '-ebkvPiYsEYX0CS6nZiLKA',
  //   consumer_secret: 'WSl_nACZLdz-0eOSL1A215xEZ7I',
  //   token: '4n6-cPnsuaEb9-_sOFrzYmnx13Xm3xz6',
  //   token_secret: 'ry4fphZHiRoQgizp2G_KDhPe-hQ'
  // });

  var term = req.query.term;
  var location = req.query.location;
  const apiKey =
    '-mIxBdaLL4T7-sx8DKBvbfd591oYjfvmLpDQHb9_yBB2rjRKBQMNSrin92afS9dgL6Uk6WVZXSyhG6p7Q0weVVZxDASuK7ARk_mQVRTIuZBe-1smn7AI2OcW5X19W3Yx';

  const client = yelp.client(apiKey);

  client
    .search({
      term: term,
      location: location
    })
    // .then(response => {
    //   console.log(response.jsonBody.businesses[0].name);

    // })
    // .catch(e => {
    //   console.log(e);
    // });
    .then(function(data) {
      console.log(JSON.stringify(data.jsonBody.businesses));
      // res.json(data);
      var content = {
        title: term + ' in ' + location,
        place: location,
        data: data.jsonBody.businesses
      };

      var format = req.query.format == null ? 'html' : req.query.format;
      if (format == 'json') {
        res.json(data);
      } else {
        res.render('yelp', content);
      }
    })

    .catch(function(err) {
      console.error(err);
    });
  // yelp
  //   .search({ term: term, location: location })
  //   .then(function(data) {
  //     // res.json(data);
  //     var content = {
  //       title: term + ' in ' + location,
  //       place: location,
  //       data: data
  //     };

  //     var format = req.query.format == null ? 'html' : req.query.format;
  //     if (format == 'json') {
  //       res.json(data);
  //     } else {
  //       res.render('yelp', content);
  //     }
  //   })

  //   .catch(function(err) {
  //     console.error(err);
  //   });
});

router.post('/', function(req, res, next) {
  var id = req.query.id;
  res.json(id);
});

module.exports = router;
