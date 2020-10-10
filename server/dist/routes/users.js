"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = require("bcrypt");
var passport_1 = __importDefault(require("passport"));
var google_auth_library_1 = require("google-auth-library");
var user_1 = __importDefault(require("../models/user"));
var client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var router = express_1.Router();
router.post("/users/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userExists, hashedPassword, newUser, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findOne({ email: email }).then(function (i) { return !!i; })];
            case 2:
                userExists = _c.sent();
                if (userExists)
                    return [2 /*return*/, res.sendStatus(409)];
                return [4 /*yield*/, bcrypt_1.hash(password, 10)];
            case 3:
                hashedPassword = _c.sent();
                newUser = new user_1.default({
                    email: email,
                    password: hashedPassword,
                    notes: [],
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 5:
                _b = _c.sent();
                return [2 /*return*/, res.sendStatus(500)];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post("/users/login", passport_1.default.authenticate("login"), function (_, res) {
    return res.sendStatus(200);
});
router.post("/users/logout", function (req, res) {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(function () {
        res.sendStatus(200);
    });
});
exports.default = router;
router.post("/users/login/google", function (req, res, next) {
    client
        .verifyIdToken({
        idToken: req.body.tokenID,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
        .then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
        var email, hashedPassword;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    email = (_a = resp.getPayload()) === null || _a === void 0 ? void 0 : _a.email;
                    return [4 /*yield*/, bcrypt_1.hash(email + process.env.PASSWORD_SECRET, 10)];
                case 1:
                    hashedPassword = _b.sent();
                    user_1.default.findOne({ email: email }).then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        var newUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!user) return [3 /*break*/, 2];
                                    newUser = new user_1.default({
                                        email: email,
                                        notes: [],
                                        password: hashedPassword,
                                    });
                                    return [4 /*yield*/, newUser.save()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    req.body.email = email;
                                    req.body.password = email + process.env.PASSWORD_SECRET;
                                    next();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
});
router.use("/users/login/google", passport_1.default.authenticate("login"), function (_, res) {
    return res.sendStatus(200);
});