import { StrategyOptions, VerifyCallback } from "passport-oauth2";
export type PassportProfileBody = {
    resultcode: string;
    message: string;
    response: {
        id: string;
        nickname: string;
        profile_image: string;
        age: string;
        gender: string;
        email: string;
        mobile: string;
        mobile_e164: string;
        name: string;
        birthday: string;
        birthyear: string;
    };
};
export type Profile = {
    provider: "naver";
    id: string;
    nickname?: string;
    profileImage?: string;
    age?: string;
    gender?: string;
    email?: string;
    mobile?: string;
    mobileE164?: string;
    name?: string;
    birthday?: string;
    birthYear?: string;
    _raw?: string | Buffer;
    _json: string;
};
export type constructorSuperOptions = StrategyOptions;
export interface NaverStrategyValidate {
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void>;
}
export interface NaverStrategyValidateWithRequest {
    validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void>;
}
