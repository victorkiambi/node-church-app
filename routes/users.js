const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = require('../app/controllers/users-controller.js');
  users.findAll(req, res);
});
module.exports = router;
