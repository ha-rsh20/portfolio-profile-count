const express = require("express");
const router = express.Router();
const { addView } = require("../Controllers/addViewController");

router.route("/addCount").post(addView);

module.exports = router;
