module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');

  // Sing in user
  app.post('/auth/signin', auth.signIn);
}
