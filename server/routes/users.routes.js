const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../middleware/auth.middleware")
const { signup, login } = require("../models/users.model");


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
      error: "Invalid data provided",
    });
  });
  
  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send({
        success: false,
        data: null,
        error: "Invalid data provided",
    });
  }
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      res.send({ success: false, error: err, data: null });
    }
    return res
    .cookie("jwt", info.token, { secure: true, httpOnly: true })
    .send({ success: true, error: null, data: user });
  })(req, res);
});

router.get("/validate", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username, uuid: req.user.uuid, id: req.user.id}
  })
})

router.get("/logout", (req,res) => {
  res.clearCookie("jwt");
  return res.send({ success: true, error: null, body: null});
})

module.exports = router;
