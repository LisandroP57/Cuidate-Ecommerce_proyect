const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const process = require("process");
const { User } = require("../database/models");

module.exports = (passport) => {
  const CONFIGS = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/users/auth/google/callback",
  };
  passport.use(
    new Strategy(CONFIGS, async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
            where: {
              googleId: profile.id,
            },
            defaults: {
              name: profile.name.givenName,
              last_name: profile.name.familyName,
              email: profile.emails[0].value,
              pass: "cuidate",
              role: 0,
              phone: "",
            },
          });
          return done(null, user);
      } catch (error) {
        console.log(error)
      }
    })
  );
};