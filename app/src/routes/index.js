        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const controller = require("../controllers/indexController");

router.get('/home', controller.index);
router.get('/', controller.index); 

module.exports = router;