const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const letters = await prisma.Letter.findMany({});
    res.render("create", { letters: letters, user: req.session.user, title: 'Create a List' });
});

router.post('/', async function(req, res) {
    await prisma.List.create({ data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.letterData,
        user_id: req.session.user.id
    }});

    res.redirect("/list");
});

module.exports = router;