const express = require('express');
const router = express.Router();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', (req, res) =>{
    res.render("login", { title: "Login" });
});

router.post("/", async (req,res) =>{
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const user = await prisma.user.findFirst({where: {email: email}});
    // Check the user account and password, if not will display message
    if (!user){
        res.render("login", { message:"User does not exist!" }, { title: "Login" });
    }
    else if (user.password !== password){
        res.render("login", {message:"Wrong password!"});
    }
    // if exist will change to other page
    else{
        req.session.user = user;
        res.redirect("/list");
        console.log(req.session.user)
    }
});

module.exports = router;