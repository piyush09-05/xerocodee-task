const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup  =require('./util/passport.js');
const app = express();

const Authentication = require('./controller/Authetication.js');
const AuthRoute = require('./controller/AuthRoute.js')

// app.use(cookieSession(
//     {
//         name:"session",
//         keys:["lama"],
//         maxAge:24*60*60*100
//     } 
// ));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.use(cors(
    {
        origin:"https://xerocodee-task-git-main-piyushs-projects-1ae0757a.vercel.app",
        methods:"GET,POST,PUT,DELETE",
        credentials:true

    }
)); 



app.use(Authentication);
app.use(AuthRoute);

app.listen(9000, () => {
    console.log("Server listeninig");
})