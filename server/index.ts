import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";
const MongoStore = require("connect-mongo")(session);

import userRoutes from "./routes/users";
import notesRoutes from "./routes/notes";

import rootDir from "./utils/path";
import initPassport from "./passport config";
// Dev requirement
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

initPassport(passport);

console.log(process.env);

mongoose.connect(process.env.MONGO_DB_PASS!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(rootDir, "..", "..", "client", "build")));
app.use(cors());
app.use(json());

app.use(
  session({
    name: "user",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRoutes);
app.use("/api", notesRoutes);

app.get("*", (_, res) => {
  res.sendFile(path.join(rootDir, "..", "..", "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
