        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const indexController = require("../controllers/indexController");

router
        .get('/home', indexController.index)
        .get('/', indexController.index)

module.exports = router;