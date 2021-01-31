const path = require('path');
const express = require('express');
const { Quotes } = require('./api/quotes');
const { db, getAllJournals, addJournals, deleteJournal, updateJournal} = require('./db/dbBase.js');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
require('dotenv').config();
const session = require('express-session');

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use('/api/quotes', Quotes);
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
  console.log(res);
  return deleteJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

app.put('/api/journals', (req, res) => {
  return updateJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});



app.listen(port, () => {
  console.log(`Server is listening on http://127.0.0.1:${port}`);
});

