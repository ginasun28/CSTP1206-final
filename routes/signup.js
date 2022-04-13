const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

router.get('/', function(req, res) {
  res.render('signup', { title: 'Sign Up' });
});

router.post("/", async (req,res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const user = await prisma.user.findFirst({ where: { email: email }});
  if (user) {
      res.render("signup", {message:"The email is already signuped, please try use different email."});
  }
  else {
      const newUser = await prisma.user.create
      ({
        data:
        {
          email: email,
          password: password
        }

      });
      res.redirect("/login");
  }

});

module.exports = router;