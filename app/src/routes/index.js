        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const {
        index,
        search
} = require("../controllers/indexController");

router
        .get('/', index)
        .get('/search', search);
        
module.exports = router;