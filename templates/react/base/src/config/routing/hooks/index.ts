import { useSearchParams, useNavigate } from 'react-router-dom';

import type { SearchParamsSchema, NavigateToDelta, AnyRouteConfig, NavigateToArgs, RouteSearchKeys } from '../types';
import createSearchParams from '../utils/create-search-params';
import createPathname from '../utils/create-path-names';

const useAppNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function navigateTo(delta: NavigateToDelta): void;
  function navigateTo<TRoute extends AnyRouteConfig>(route: TRoute, ...args: NavigateToArgs<TRoute>): void;
  function navigateTo(
    routeOrDelta: NavigateToDelta | AnyRouteConfig,
    options?: {
      params?: Record<string, string | number>;
      search?: SearchParamsSchema;
      replace?: boolean;
      state?: unknown;
    }
  ) {
    if (typeof routeOrDelta === 'number') {
      navigate(routeOrDelta);
      return;
    }

    const params = 'params' in (options ?? {}) ? options?.params : undefined;
    const pathname = createPathname(routeOrDelta.path, params);
    const search = createSearchParams(options?.search);

    navigate({ pathname, search }, { replace: options?.replace, state: options?.state });
  }

  function getSearchParam<TRoute extends AnyRouteConfig>(route: TRoute, key: RouteSearchKeys<TRoute>): string | null {
    return searchParams.get(key);
  }

  function getAllSearchParams<TRoute extends AnyRouteConfig>(route: TRoute): Record<RouteSearchKeys<TRoute>, string | null> {
    const result = {} as Record<RouteSearchKeys<TRoute>, string | null>;

    for (const [key, value] of searchParams.entries()) {
      (result as Record<string, string | null>)[key] = value;
    }

    return result;
  }

  return { getSearchParam, getAllSearchParams, searchParams, navigateTo };
};

export default useAppNavigate;
