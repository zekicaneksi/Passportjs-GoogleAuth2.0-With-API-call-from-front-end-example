import express from 'express';
import Axios from 'Axios';
import passport from 'passport';
import session from 'express-session';
import googleAuth from 'passport-google-oauth20';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false ,
  saveUninitialized: true ,
}));

app.use(passport.initialize());
app.use(passport.session());  

var GoogleStrategy = googleAuth.Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken=refreshToken;
    return cb(null, profile);
  }
));

passport.serializeUser( (user, done) => { done(null, user)} );
passport.deserializeUser((user, done) => {done (null, user)});

app.use(checkAuthenticated).use(express.static('public'));

// Middleware
function checkAuthenticated (req, res, next) {
  if (!req.isAuthenticated() && req.originalUrl==='/inside.html') return res.redirect("/");
  if (req.isAuthenticated() && req.originalUrl==='/') return res.redirect('/inside.html');
  return next();
}

app.get('/getAcessToken', async (req,res) => {
  let toReturn='';
  await Axios
  .post('https://oauth2.googleapis.com/token', {
    client_id: process.env.clientID,
    client_secret: process.env.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: req.user.refreshToken
  })
  .then(res => {
    toReturn = res.data.access_token;
  })
  .catch(error => {
    console.log(error);
  });
  return res.send(JSON.stringify(toReturn));
});

app.get('/auth/google',
    passport.authenticate('google', { accessType:'offline', prompt:'consent', scope: [
    'https://www.googleapis.com/auth/youtube.readonly',
    "profile"] })
);

app.get(process.env.callbackURL,
    passport.authenticate('google', { failureRedirect: '/error.html' }),
    function(req, res) {
      res.redirect('/inside.html');
    }
);

app.get('/logout',(req, res) => {
  req.logout(function (err) {
    if (err) {
    return next(err);
    }
    return res.redirect("/");
  });
});

app.listen(3000, () => console.log(`Server listening on port: 3000`));