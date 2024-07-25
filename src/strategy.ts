import OAuth2Strategy, {
  InternalOAuthError,
  StrategyOptions,
  VerifyFunction,
} from "passport-oauth2";
import {
  AUTHORIZATION_NAME,
  AUTHORIZATION_URL,
  PROFILE_URL,
  TOKEN_URL,
} from "./constants";
import { PassportProfileBody, Profile } from "./types";

export default class Strategy extends OAuth2Strategy {
  public _profileURL: string;

  constructor(options: Partial<StrategyOptions>, verify: VerifyFunction) {
    options.authorizationURL = options.authorizationURL || AUTHORIZATION_URL;
    options.tokenURL = options.tokenURL || TOKEN_URL;
    options.clientSecret = options.clientSecret || AUTHORIZATION_NAME;

    super(options as StrategyOptions, verify);

    this.name = "naver";
    this._profileURL = PROFILE_URL;
  }

  override authorizationParams(options: any) {
    var params = {} as any;

    if (options.authType) {
      params.auth_type = options.authType;
    }

    return params;
  }

  override userProfile(
    accessToken: string,
    done: (error: Error | null, profile?: Profile) => void
  ) {
    this._oauth2.get(this._profileURL, accessToken, (err, result) => {
      if (err) {
        return done(new InternalOAuthError("Fail to fetch user profile", err));
      }

      try {
        const parsedBody = JSON.parse(result as string);

        const { response, resultcode } = parsedBody as PassportProfileBody;

        if (resultcode !== "00") {
          return done(
            new InternalOAuthError(
              "Something went wrong from naver login api",
              err
            )
          );
        }

        const {
          id,
          nickname,
          age,
          gender,
          email,
          mobile,
          name,
          birthday,
          birthyear: birthYear,
          profile_image: profileImage,
          mobile_e164: mobileE164,
        } = response;

        const profile: Profile = {
          provider: AUTHORIZATION_NAME,
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
      } catch (e) {
        return done(
          new InternalOAuthError("😵 Failed to parse profile response", err)
        );
      }
    });
  }
}
