var express = require('express');
var router = express.Router();

// const noticiaController = require('../controllers/noticia');
const entradaController = require('../controllers/entrada');
const userController = require('../controllers/user');

//-----------------------------------------------------------

// History: Restoration routes.

// Redirection to the saved restoration route.
function redirectBack(req, res, next) {
  const url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
}

router.get('/goback', redirectBack);

// Save the route that will be the current restoration route.
function saveBack(req, res, next) {
  req.session.backURL = req.url;
  next();
}

// Restoration routes are GET routes that do not end in:
//   /new, /edit, /play, /check, or /:id.
router.get(
    [
      '/',
      '/contacto',
      '/users',
      '/entradas'
    ],
    saveBack);

//-----------------------------------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Contacto page.
router.get('/contacto', (req, res, next) => {
  res.render('contacto');
});



// Autoload for routes using :entradaId
router.param('entradaId', entradaController.load);

// Autoload for routes using userId
router.param('userId', userController.load);


// Routes for the resource /users
router.get('/users',                    userController.index);
router.get('/users/:userId(\\d+)',      userController.show);
router.get('/users/new',                userController.new);
router.post('/users',                   userController.create);
router.get('/users/:userId(\\d+)/edit', userController.edit);
router.put('/users/:userId(\\d+)',      userController.update);
router.delete('/users/:userId(\\d+)',   userController.destroy);

// Routes for the resource /entradas
router.get('/entradas',                        entradaController.index);
router.get('/entradas/:entradaId(\\d+)',           entradaController.show);
router.get('/entradas/new',                    entradaController.new);
router.post('/entradas',                       entradaController.create);
router.get('/entradas/:entradaId(\\d+)/edit',      entradaController.edit);
router.put('/entradas/:entradaId(\\d+)',           entradaController.update);
router.delete('/entradas/:entradaId(\\d+)',        entradaController.destroy);

module.exports = router;
