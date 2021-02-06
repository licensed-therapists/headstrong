const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const addJournals = require('./db/dbBase.js');
require('dotenv').config();

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: '995250918657-fii1ko5min57tcn6nft7grkjivnb6ih8.apps.googleusercontent.com',
  clientSecret: 'pDMe39hPEFAuH2APPR2j9UGk',
  callbackURL: '/auth/google/callback'
},
function(token, tokenSecret, profile, done) {

  // profile is google profile
  // done is being passed to the callback url under key user
  done(null, profile);

}
));
