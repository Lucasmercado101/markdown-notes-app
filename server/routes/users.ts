import { Router } from "express";
import { hash as hashPassword } from "bcrypt";
import passport from "passport";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

const router = Router();

router.post("/users/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email }).then((i) => !!i);
    if (userExists) return res.sendStatus(409);
    const hashedPassword = await hashPassword(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      notes: [],
    });
    await newUser.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
});

router.post("/users/login", passport.authenticate("login"), (_, res) =>
  res.sendStatus(200)
);

router.post("/users/logout", (req, res) => {
  req.session?.destroy(() => {
    res.sendStatus(200);
  });
});

export default router;
router.post("/users/login/google", (req, res, next) => {
  client
    .verifyIdToken({
      idToken: req.body.tokenID,
      audience: process.env.GOOGLE_CLIENT_ID!,
    })
    .then(async (resp) => {
      const email = resp.getPayload()?.email;
      const hashedPassword = await hashPassword(
        email + process.env.PASSWORD_SECRET!,
        10
      );
      User.findOne({ email }).then(async (user) => {
        if (!user) {
          const newUser = new User({
            email,
            notes: [],
            password: hashedPassword,
          });
          await newUser.save();
        }
        req.body.email = email;
        req.body.password = email + process.env.PASSWORD_SECRET!;
        next();
      });
    });
});

router.use("/users/login/google", passport.authenticate("login"), (_, res) =>
  res.sendStatus(200)
);
