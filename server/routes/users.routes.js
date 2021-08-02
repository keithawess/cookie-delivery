const express = require("express");
const router = express.Router();
const {signup, login} = require("../models/users.model");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (
    username &&
    password &&
    username.length > 3 &&
    username.length <= 20 &&
    password.length >= 6
  ) {
    return signup(res, username, password);
  }
  return res.send({
      success: false,
      data: null,
      error: "Invalid data provided"
  });
});

router.post("/login", (req,res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.send({
            success: false,
            data: null,
            error: "Invalid data provided"
        });
    }
    else {
        return login(res, username, password);
    }
})

module.exports = router;
