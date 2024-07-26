"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_oauth2_1 = __importStar(require("passport-oauth2"));
const constants_1 = require("./constants");
class Strategy extends passport_oauth2_1.default {
    _profileURL;
    constructor(options, verify) {
        options.authorizationURL = options.authorizationURL || constants_1.AUTHORIZATION_URL;
        options.tokenURL = options.tokenURL || constants_1.TOKEN_URL;
        options.clientSecret = options.clientSecret || constants_1.AUTHORIZATION_NAME;
        super(options, verify);
        this.name = "naver";
        this._profileURL = constants_1.PROFILE_URL;
    }
    authorizationParams(options) {
        var params = {};
        if (options.authType) {
            params.auth_type = options.authType;
        }
        return params;
    }
    userProfile(accessToken, done) {
        this._oauth2.get(this._profileURL, accessToken, (err, result) => {
            if (err) {
                return done(new passport_oauth2_1.InternalOAuthError("Fail to fetch user profile", err));
            }
            try {
                const parsedBody = JSON.parse(result);
                const { response, resultcode } = parsedBody;
                if (resultcode !== "00") {
                    return done(new passport_oauth2_1.InternalOAuthError("Something went wrong from naver login api", err));
                }
                const { id, nickname, age, gender, email, mobile, name, birthday, birthyear: birthYear, profile_image: profileImage, mobile_e164: mobileE164, } = response;
                const profile = {
                    provider: constants_1.AUTHORIZATION_NAME,
                    id,
                    nickname,
                    profileImage,
                    age,
                    gender,
                    email,
                    mobile,
                    mobileE164,
                    name,
                    birthday,
                    birthYear,
                    _raw: result,
                    _json: parsedBody,
                };
                done(null, profile);
            }
            catch (e) {
                return done(new passport_oauth2_1.InternalOAuthError("😵 Failed to parse profile response", err));
            }
        });
    }
}
exports.default = Strategy;
//# sourceMappingURL=strategy.js.map