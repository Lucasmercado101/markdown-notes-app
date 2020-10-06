import { Router } from "express";
import { hash as hashPassword } from "bcrypt";
import passport from "passport";
import User from "../models/user";

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

export default router;
