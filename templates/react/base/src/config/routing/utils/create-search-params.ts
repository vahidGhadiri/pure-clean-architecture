import type { SearchValue } from '../types';

export const createSearchParams = (search?: Record<string, SearchValue>) => {
    if (!search) {
        return '';
    }

    const params = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item === null || item === undefined || item === '') {
                    return;
                }

                params.append(key, String(item));
            });

            return;
        }

        params.set(key, String(value));
    });

    return params.toString();
};

export default createSearchParams;
