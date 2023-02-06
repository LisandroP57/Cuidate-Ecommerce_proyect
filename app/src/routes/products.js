        /* Require's */
const express = require("express");
const router = express.Router();

        /* Controller Require */
const controller = require("../controllers/productsController");

router.get('/creacion', controller.creacion);
router.get('/edicion', controller.edicion);

module.exports = router;