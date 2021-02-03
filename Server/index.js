const path = require('path');
const express = require('express');
const { Quotes } = require('./api/quotes');
const { Weather } = require('./api/weather');
const { db, getAllJournals, addJournals, deleteJournal, updateJournal} = require('./db/dbBase.js');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./db/dbBase.js');

const port = process.env.PORT || 8080;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use('/api/quotes', Quotes);
app.use('/api/weather', Weather);
app.use(passport.initialize());
app.use(passport.session());
// used to parse cookies
app.use(cookieParser('TOzC2FS4ZzoHKArfTltR0fP7'));

// line 20 - 40 all used for google login
app.use(
  session({
    secret: process.env.clientSecret,
    saveUninitialized: false,
    resave: true,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// this is the google login route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// redirect route for google login
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // user is the key that done passed down and take just the ID
    // setting cookie key to headstrong and value to user id
    res.cookie('Headstrong', req.user.id);
    res.redirect('/');
  });


app.get('/isloggedin', (req, res) => {
  // check to see if the cookie key is headstrong
  if (req.cookies.Headstrong) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// route to logout
app.delete('/logout', (req, res) => {
  // delete the cookie key headstrong
  res.clearCookie('Headstrong');
  res.json(false);
});


app.get('/api/journals', (req, res) => {
  return getAllJournals()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/api/journals', (req, res) => {
  return addJournals(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.delete('/api/journals', (req, res) => {
  // console.log(res);
  return deleteJournal(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.put('/api/journals', (req, res) => {
  console.info(req.body);
  return updateJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});



app.listen(port, () => {
  console.log(`Server is listening on http://127.0.0.1:${port}`);
});

