var express = require('express');
var router = express.Router();


const entradaController = require('../controllers/entrada');
const userController = require('../controllers/user');
const sessionController = require('../controllers/session');

//-----------------------------------------------------------

// Routes for the resource /login

// autologout
router.all('*',sessionController.checkLoginExpires);

// login form
router.get('/login', sessionController.new);

// create login session
router.post('/login',
    sessionController.create,
    sessionController.createLoginExpires);


// Authenticate with OAuth 2.0 at Twitter
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
  router.get('/auth/twitter',
      sessionController.authTwitter);
  router.get('/auth/twitter/callback',
      sessionController.authTwitterCB,
      sessionController.createLoginExpires);
}

// Authenticate with OAuth 2.0 at Twitter
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/auth/google',
      sessionController.authGoogle);
  router.get('/auth/google/callback',
      sessionController.authGoogleCB,
      sessionController.createLoginExpires);
}

// Authenticate with OAuth 1.0 at Facebook
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  router.get('/auth/facebook',
      sessionController.authFacebook);
  router.get('/auth/facebook/callback',
      sessionController.authFacebookCB,
      sessionController.createLoginExpires);
}

// Authenticate with OAuth 1.0 at Outlook
if (process.env.OUTLOOK_CLIENT_ID && process.env.OUTLOOK_CLIENT_SECRET) {
  router.get('/auth/outlook',
      sessionController.authOutlook);
  router.get('/auth/outlook/callback',
      sessionController.authOutlookCB,
      sessionController.createLoginExpires);
}


// logout - close login session
router.delete('/login', sessionController.destroy);

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
//   /new, /edit, /play, /check, /login or /:id.
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
router.get('/users/:userId(\\d+)/edit', userController.isLocalRequired, userController.edit);
router.put('/users/:userId(\\d+)',      userController.isLocalRequired, userController.update);
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
