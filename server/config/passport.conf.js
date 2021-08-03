const LocalStrategy = require("passport-local");
const { Strategy } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { login, findUser } = require("../models/users.model");

function configPassport(passport) {
  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      const { data, error } = await login(username, password);
      if (error) {
        return done(error);
      }

      const token = jwt.sign({ uuid: data.uuid }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });

      return done(
        null,
        {
          username: data.username,
        },
        { token }
      );
    })
  );

  const cookieJWTExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };

  const jwtOptions = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: cookieJWTExtractor,
  };

  passport.use("jwt", new Strategy(jwtOptions, async (payload, done) => {
      if(!payload || !payload.uuid) {
          return done(true, false, "Invalid Credentials");
      }
      const {data, error} = await findUser(payload.uuid);
      if (error)
      {
          return done(true, false, "Invalid credentials");
      }
      return done(false, data, null);
  }));

  passport.serializeUser((user, done) => {
      done(null, user.id);
  })

}

module.exports = configPassport;