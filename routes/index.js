var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Contacto page.
router.get('/contacto', (req, res, next) => {
  res.render('contacto');
});

module.exports = router;
