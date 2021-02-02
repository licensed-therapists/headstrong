const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: '1022726006608-vs6a1r20udmo6risbphj8f9dgldplrfn.apps.googleusercontent.com',
  clientSecret: 'TOzC2FS4ZzoHKArfTltR0fP7',
  callbackURL: '/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
  // profile is google profile
  // done is being passed to the callback url under key user
  done(null, profile);

}
));
