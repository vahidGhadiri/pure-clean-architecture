import type { DeleteCookieParams, GetCookieParams, SetCookieParams, ICookie } from '@shared_kernel/contracts';

export default class Cookie implements ICookie {
    public setCookie({ options, value, name }: SetCookieParams): void {
        let cookie = `${name}=${encodeURIComponent(value)}`;
        if (options?.path) cookie += `; path=${options.path}`;
        if (options?.domain) cookie += `; domain=${options.domain}`;
        if (options?.maxAge) cookie += `; max-age=${options.maxAge}`;
        if (options?.expires) cookie += `; expires=${options.expires.toUTCString()}`;
        if (options?.secure) cookie += '; secure';
        if (options?.httpOnly) cookie += '; httponly';
        if (options?.sameSite) cookie += `; samesite=${options.sameSite}`;
        document.cookie = cookie;
    }

    public deleteCookie({ domain, name, path }: DeleteCookieParams): void {
        this.setCookie({
            options: {
                path: path ?? '/',
                maxAge: 0,
                domain,
            },
            value: '',
            name,
        });
    }

    public getCookie({ name }: GetCookieParams): string | null {
        const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return match ? decodeURIComponent(match[1]) : null;
    }
}
