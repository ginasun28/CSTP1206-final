const express = require('express');
const router = express.Router();

/*Once the user logout the browers cookie will clear the user name and then go back to the Login page.*/ 
router.get('/', (req, res) =>{
  req.session.user = undefined;
  res.render("login");
});

module.exports = router;
