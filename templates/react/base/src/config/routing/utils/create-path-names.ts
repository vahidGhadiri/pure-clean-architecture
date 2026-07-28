type CreatePathnameParamsType = Partial<Record<string, string | number>>;

export const createPathname = <TPath extends string>(path: TPath, params?: CreatePathnameParamsType) => {
    const resolvedPath = path
        .split('/')
        .map((segment) => {
            if (!segment.startsWith(':')) {
                return segment;
            }

            const rawParamName = segment.slice(1);
            const isOptional = rawParamName.startsWith('?');
            const paramName = rawParamName.replace(/^\?/, '').replace(/\?$/, '');
            const value = params?.[paramName];

            if (value === undefined || value === null || value === '') {
                if (isOptional) {
                    return null;
                }

                throw new Error(`Some params are missed: ${paramName}`);
            }

            return encodeURIComponent(String(value));
        })
        .filter(Boolean)
        .join('/');

    return path.startsWith('/') ? `/${resolvedPath}` : resolvedPath;
};

export default createPathname;
