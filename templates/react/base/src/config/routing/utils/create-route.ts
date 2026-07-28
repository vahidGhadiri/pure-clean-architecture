import type { SearchParamsSchema, RouteConfig } from '../types';

type RouteBuilder<TPath extends string, TName extends string> = {
    search: <TSearch extends SearchParamsSchema>() => RouteConfig<TPath, TName, TSearch>;
} & RouteConfig<TPath, TName>;

const normalizeRoutePath = (path: string) => {
    return path.replace(/\?:([^/]+)/g, ':$1?').replace(/:\?([^/]+)/g, ':$1?');
};

export const createRoute = <TPath extends string>(path: TPath) => {
    const normalizedPath = normalizeRoutePath(path);

    return {
        name<TName extends string>(name: TName): RouteBuilder<TPath, TName> {
            return {
                search<TSearch extends SearchParamsSchema>() {
                    return { path: normalizedPath as TPath, name } as RouteConfig<TPath, TName, TSearch>;
                },
                path: normalizedPath as TPath,

                name,
            } as RouteBuilder<TPath, TName>;
        },
    };
};
