export interface IHeadersBuilder {
    addIf(condition: boolean, key: string, value?: string | null): this;
    merge(headers?: Record<string, undefined | string | null>): this;
    add(key: string, value?: string | null): this;
    get(key: string): undefined | string;
    build(): Record<string, string>;
    remove(key: string): this;
    has(key: string): boolean;
    toHeaders(): Headers;
    reset(): this;
}
