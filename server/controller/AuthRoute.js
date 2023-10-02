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
        res.redirect("https://xerocodee-task-ae1rbdhlx-piyushs-projects-1ae0757a.vercel.app/")
       }
    })
    
})
router.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect:"https://xerocodee-task-ae1rbdhlx-piyushs-projects-1ae0757a.vercel.app/dashboard/piyush/piyush@mail.com",
    failureRedirect:"/login/failed"
}))

module.exports = router;