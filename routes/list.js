const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const userId = req.session.user.id;
    // const plants = await prisma.Plant.findMany({where: { user_id: userId }});
    res.render("list", {user: req.session.user, title: "Lists" });
});

// router.get('/plantsitem', async (req, res) => {
//     const id = parseInt(req.query.id);
//     const plant = await prisma.Plant.findFirst({where: {id: id}});
//     plant["title"] = "Plant";
//     res.render("product", plant);
// });

// Search item from each id
// router.get('/plantsitem/find', async (req, res) => {
//     const query = req.body.query || req.query.query;
//     const plants = await prisma.Plant.findMany({ where:{name: query.toLowerCase() }});
//     res.render("list",{ plants: plants });
// });

module.exports = router;