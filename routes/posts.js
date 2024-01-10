const express = require('express');
const router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
    const posts = require('../app/controllers/posts-controller.js');
    posts.findAll(req, res);
});

module.exports = router;