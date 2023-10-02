const passport = require('passport');
const router = require('express').Router();


router.get('/login/failed', (req,res) => {
    res.status(401).json({
        success:false,
        message:"failure"
    }
       
    )
})
router.get('/logout', (req,res) => {
    req.logout();
    req.session.destroy((err) => {
       if(err){
          console.error("error destroying the session");
       }
       else{
        res.redirect("http://localhost:3000")
       }
    })
    
})
router.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect:"http://localhost:3000/dashboard/piyush/piyush@mail.com",
    failureRedirect:"/login/failed"
}))

module.exports = router;