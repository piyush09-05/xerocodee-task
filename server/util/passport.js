const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const SocialUser = require('../models/UserSocial.js');
const User = require('../models/UserProfile.js')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const GOOGLE_CLIENT_ID = "716711964050-5trqhpdek110p93dfj08588gpmqr1570.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
      try {
        const existingUser  = await SocialUser.findOne({serialString:profile.id});
        if(existingUser){
            return cb(null, existingUser);
        }
        else{
            const newUser = new SocialUser({
                serialString:profile.id,
                name:profile.displayName
            });
            
            await newUser.save();
    
            cb(null,newUser);
        } 
       
   

      } catch (error) {
          cb(error);
      }
  }
));
passport.serializeUser((user,cb) => {
    cb(null,user.id);
})
passport.deserializeUser(async (id, cb) => {
    try {
      // Deserialize the user by fetching their data from the database
      const user = await SocialUser.findById(id);
      cb(null, user);
    } catch (error) {
      cb(error);
    }
  });