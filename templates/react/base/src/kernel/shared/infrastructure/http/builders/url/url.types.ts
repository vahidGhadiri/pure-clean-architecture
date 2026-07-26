export interface BuildUrlParams {
    readonly pathParams?: Record<string, string | number>;
    readonly query?: Record<string, unknown> | string;
    readonly serviceEndpoint: string;
    readonly baseUrl: string;
}

export interface IUrlBuilder {
    toAbsoluteUrl(path: string, baseOrigin?: string): string;
    build(params: BuildUrlParams): string;
    buildPath(...parts: string[]): string;
}
