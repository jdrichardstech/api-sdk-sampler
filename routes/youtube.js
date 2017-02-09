var express = require('express');
var router = express.Router()
var search = require('youtube-search');

router.get('/', function(req, res, next) {
  var opts = {
    maxResults: 10,
    key: 'AIzaSyCxSusaCdp2Tz_SV_ceSDKSdhvLSTZ7UEI'
  };
  var searchItem=req.query.item
  search(searchItem, opts, function(err, results) {
    if(err) return console.log(err);

  var content = {
    results: results,
    item: searchItem
  }

  var format = (req.query.format==null) ? 'html': req.query.format
    if(format=='json'){
      res.json(results)
    }else{
    res.render('youtube',content)
    }
  })
})
module.exports= router
