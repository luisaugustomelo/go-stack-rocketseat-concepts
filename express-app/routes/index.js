var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', body: 'Luis', title2: 'blabla'});
});

/* router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express', body: 'Luis'});
}); */

module.exports = router;
