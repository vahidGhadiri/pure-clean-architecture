import type { AnyRouteConfig } from '../types';

export const defineRoute = <TRoutes extends Record<string, AnyRouteConfig>>(routes: TRoutes) => {
    return Object.freeze(routes);
};
