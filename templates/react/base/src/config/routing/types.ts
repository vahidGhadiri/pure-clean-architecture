type RouteSearch<TRoute> = TRoute extends RouteConfig<string, string, infer TSearch> ? TSearch : never;
type PrimitiveSearchValue = undefined | boolean | string | number | null;

type HasPathParams<TPath extends string> =
  ExtractPathParams<NormalizeOptionalPathSyntax<TPath>> extends never ? false : true;

export type NavigateToOptions<TRoute extends AnyRouteConfig> =
  HasRequiredPathParams<TRoute['path']> extends true
    ? {
        params: RouteParams<TRoute['path']>;
      } & BaseNavigateOptions<TRoute>
    : HasPathParams<TRoute['path']> extends true
      ? {
          params?: RouteParams<TRoute['path']>;
        } & BaseNavigateOptions<TRoute>
      : {
          params?: never;
        } & BaseNavigateOptions<TRoute>;

export type RouteConfig<
  TPath extends string = string,
  TName extends string = string,
  TSearch extends SearchParamsSchema = SearchParamsSchema,
> = Readonly<{
  __search?: TSearch;
  path: TPath;
  name: TName;
}>;

type HasRequiredSearchArgs<TRoute extends AnyRouteConfig> =
  RouteSearch<TRoute> extends infer TSearch
    ? TSearch extends SearchParamsSchema
      ? HasRequiredSearchKeys<TSearch> extends true
        ? true
        : false
      : false
    : false;

export type NavigateToArgs<TRoute extends AnyRouteConfig> =
  HasRequiredPathParams<TRoute['path']> extends true
    ? [options: NavigateToOptions<TRoute>]
    : HasRequiredSearchArgs<TRoute> extends true
      ? [options: NavigateToOptions<TRoute>]
      : [options?: NavigateToOptions<TRoute>];
export type AnyRouteConfig = RouteConfig<string, string, SearchParamsSchema>;

export type RouteSearchKeys<TRoute extends AnyRouteConfig> =
  TRoute extends RouteConfig<string, string, infer TSearch> ? keyof TSearch & string : never;

export type SearchValue = PrimitiveSearchValue[] | PrimitiveSearchValue;

export type SearchParamsSchema = Record<string, SearchValue>;

export type NavigateToDelta = number;

type NormalizeOptionalPathSyntax<TPath extends string> = TPath extends `${infer Start}?:${infer Param}/${infer Rest}`
  ? NormalizeOptionalPathSyntax<`${Start}:${Param}?/${Rest}`>
  : TPath extends `${infer Start}?:${infer Param}`
    ? `${Start}:${Param}?`
    : TPath;

type RouteParams<TPath extends string> = {
  [Key in OptionalPathParamKeys<NormalizeOptionalPathSyntax<TPath>>]?: string | number;
} & { [Key in RequiredPathParamKeys<NormalizeOptionalPathSyntax<TPath>>]: string | number };

type RequiredPathParamKeys<TPath extends string> =
  ExtractPathParams<TPath> extends infer Param
    ? Param extends string
      ? IsOptionalParam<Param> extends true
        ? never
        : CleanParam<Param>
      : never
    : never;

type OptionalPathParamKeys<TPath extends string> =
  ExtractPathParams<TPath> extends infer Param
    ? Param extends string
      ? IsOptionalParam<Param> extends true
        ? CleanParam<Param>
        : never
      : never
    : never;

type ExtractPathParams<TPath extends string> = TPath extends `${string}:${infer Param}/${infer Rest}`
  ? ExtractPathParams<`/${Rest}`> | Param
  : TPath extends `${string}:${infer Param}`
    ? Param
    : never;

type HasRequiredSearchKeys<TSearch extends SearchParamsSchema> = {
  [K in keyof TSearch]-?: undefined extends TSearch[K] ? never : K;
}[keyof TSearch] extends never
  ? false
  : true;

type BaseNavigateOptions<TRoute extends AnyRouteConfig> =
  HasRequiredSearchKeys<RouteSearch<TRoute>> extends true
    ? {
        search: RouteSearch<TRoute>;
        replace?: boolean;
        state?: unknown;
      }
    : {
        search?: RouteSearch<TRoute>;
        replace?: boolean;
        state?: unknown;
      };

type HasRequiredPathParams<TPath extends string> =
  RequiredPathParamKeys<NormalizeOptionalPathSyntax<TPath>> extends never ? false : true;

type CleanParam<TParam extends string> = TParam extends `?${infer Param}`
  ? Param
  : TParam extends `${infer Param}?`
    ? Param
    : TParam;

type IsOptionalParam<TParam extends string> = TParam extends `?${string}`
  ? true
  : TParam extends `${string}?`
    ? true
    : false;
