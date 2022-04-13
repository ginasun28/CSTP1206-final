const express = require('express');
const router = express.Router();

// when user logout the browers will clear the user email and then go back to the Login page.
router.get('/', function(req, res) {
  res.session.user = undefined;
  res.render("login");
});

module.exports = router;
