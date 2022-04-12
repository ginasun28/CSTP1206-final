const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()
/* Allow the user to create an account by Email, once the account be created successfully, the user own 
Your Degsin folder is also created.*/
router.get('/', function(req, res) {
  console.info("I'm in the Sign Up Router");
  res.render('signup.jade', { title: 'Sign Up' });
});

router.post('/', async (req, res) => {
  try{

    const user = await prisma.user.findFirst({
      where: {
        OR:[
          {email: req.body.email}
        ]
      }
    });

    if (user){
      res.render("signup", {message:"User name or email is already registered, please try use different user email."});
      return;
    }

    //const hashedPassword = await bcrypt.hash(req.body.pwd, 10)
    const newUser = await prisma.user.create({data:{
      email: req.body.email,
      password: hashedPassword
    }});
    res.redirect('/login');
  }catch(error)
  {
    console.error(error);
    res.redirect('/signup');
  }
})

module.exports = router;