const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const userId = req.session.user.id;
    const lists = await prisma.List.findMany({where: { user_id: userId }});
    res.render("list", {lists: lists, user: req.session.user, title: "Lists" });
});

module.exports = router;