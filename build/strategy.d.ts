import OAuth2Strategy, { StrategyOptions, VerifyFunction } from "passport-oauth2";
import { Profile } from "./types";
export default class Strategy extends OAuth2Strategy {
    _profileURL: string;
    constructor(options: Partial<StrategyOptions>, verify: VerifyFunction);
    authorizationParams(options: any): any;
    userProfile(accessToken: string, done: (error: Error | null, profile?: Profile) => void): void;
}
