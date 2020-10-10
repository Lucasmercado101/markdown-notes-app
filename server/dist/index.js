"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var MongoStore = require("connect-mongo")(express_session_1.default);
var users_1 = __importDefault(require("./routes/users"));
var notes_1 = __importDefault(require("./routes/notes"));
var path_2 = __importDefault(require("./utils/path"));
var passport_config_1 = __importDefault(require("./passport config"));
// Dev requirement
require("dotenv/config");
var port = process.env.PORT || 5000;
var app = express_1.default();
passport_config_1.default(passport_1.default);
console.log(process.env);
mongoose_1.default.connect(process.env.MONGO_DB_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
app.use(express_1.default.static(path_1.default.join(path_2.default, "..", "..", "client", "build")));
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(express_session_1.default({
    name: "user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
    cookie: {
        httpOnly: false,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api", users_1.default);
app.use("/api", notes_1.default);
app.get("*", function (_, res) {
    res.sendFile(path_1.default.join(path_2.default, "..", "..", "client", "build", "index.html"));
});
app.listen(port, function () { return console.log("Listening on port " + port + "!"); });
