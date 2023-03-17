const express = require("express");
const router = express.Router();

/* GET users listing. */


router.get("/", test);


function test(req, res) {
  res.send("hello")
}

module.exports = router;