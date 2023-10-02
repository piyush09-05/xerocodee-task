const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup  =require('./util/passport.js');
const app = express();

const Authentication = require('./controller/Authetication.js');
const AuthRoute = require('./controller/AuthRoute.js')



app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.use(cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }));

  const corsOptions = {
    origin: 'https://xero-code-client.vercel.app',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));


app.use(Authentication);
app.use(AuthRoute);

app.listen(9000, () => {
    console.log("Server listeninig");
})