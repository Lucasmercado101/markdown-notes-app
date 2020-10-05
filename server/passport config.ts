import { PassportStatic } from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import User, { User as UserType } from "./models/user";
import { compare as passwordsAreTheSame } from "bcrypt";

export default function init(passport: PassportStatic) {
  const authenticateUser: VerifyFunction = async (email, password, done) => {
    return await User.findOne({ email }, (err, user: UserType) => {
      if (user === null) return done(err, false);
      if (passwordsAreTheSame(password, user.password)) return done(err, user);
      return done(err, false);
    });
  };

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, authenticateUser)
  );
  passport.serializeUser((user: UserType, done) => done(null, user._id));
  passport.deserializeUser((userID: string, done) =>
    User.findById(userID, (err, user) => done(err, user))
  );
}
