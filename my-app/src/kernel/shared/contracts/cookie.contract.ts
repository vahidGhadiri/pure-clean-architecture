export interface CookieOptions {
    sameSite?: 'Strict' | 'None' | 'Lax';
    httpOnly?: boolean;
    secure?: boolean;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    path?: string;
}

export interface SetCookieParams {
    options?: CookieOptions;
    value: string;
    name: string;
}

export interface GetCookieParams {
    name: string;
}

export interface DeleteCookieParams {
    domain?: string;
    path?: string;
    name: string;
}

export interface ICookie {
    getCookie(params: GetCookieParams): string | null;
    deleteCookie(params: DeleteCookieParams): void;
    setCookie(params: SetCookieParams): void;
}
