const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

// Call page
// router.get('/', (req, res) =>{
//     res.render("create", { user: req.session.user, title: 'Create a List' });
// });

router.get('/', async (req, res) => {
    const id = parseInt(req.query["id"]);
    const letter = await prisma.Letter.findMany( {where:{ id:id }}); 
    res.render("create.jade", { user: req.session.user, letter:letter ,title: "Create a List" });
});

router.post('/', async function(req, res) {
    const id = parsInt(req.body.id);
    if (req.body.action === "post") {
        await prisma.Letter.update({ data: {
            name: req.body.name,
            description: req.body.description,
            image: req.body.imageData,
            user_id: req.session.user.id
            },
            where: {
                id: id
            }
        });
        res.redirect("/list");
        return;
    }
});

router.post('/', async function(req, res){
    await prisma.Letter.create({data:{
        name: req.body.name,
        description: req.body.description,
        image: req.body.imageData,
        user_id: req.session.user.id
    }});

    res.redirect("/list");
});

module.exports = router;