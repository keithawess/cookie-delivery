const express = require("express");
const router = express.Router();
const {signup} = require("../models/users.model");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (
    username &&
    password &&
    username.length > 3 &&
    username.length <= 20 &&
    password.length >= 6 &&
    password.length <= 20
  ) {
    return signup(res, username, password);
  }
  return res.send({
      success: false,
      data: null,
      error: "Invalid data provided"
  });
});

module.exports = router;
