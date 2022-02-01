export interface UserTokenFail {
    readonly isAuth: boolean;
}

export type UserTokenResponse<T> = T | UserTokenFail;

export const hasTokenRequestFailed = <U>(userTokenResponse: UserTokenResponse<U>): userTokenResponse is UserTokenFail => Boolean(!(userTokenResponse as any).isAuth);

export interface GoogleLogin {
    readonly google_auth_url: string
}

export interface AuthArgs {
    readonly tokenId: string;
}

export interface LogoutArgs {
    readonly username: string
}

export interface AuthTokenUser {
    readonly accessToken: string;
    readonly email: string;
    readonly username: string;
    readonly photoURL: string;
    readonly name: string;
    readonly isAuth: boolean;
}

export interface Logout {
    readonly tokenDeleted: boolean;
}