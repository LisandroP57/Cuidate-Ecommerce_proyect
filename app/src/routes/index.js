        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const { index } = require("../controllers/indexController");

router.get('/', index)
  
module.exports = router;