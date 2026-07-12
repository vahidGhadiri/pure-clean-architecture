import type { IHeadersBuilder } from './headers.types';

const VALID_HEADER_KEY_REGEX = /^[a-zA-Z0-9-]+$/;

export default class HeadersBuilder implements IHeadersBuilder {
    private readonly headers = new Map<string, string>();

    public merge(headers?: Record<string, undefined | string | null>): this {
        if (!headers) return this;
        for (const [key, value] of Object.entries(headers)) {
            this.add(key, value);
        }
        return this;
    }

    public add(key: string, value?: string | null): this {
        this.validateKey(key);
        if (value != null) {
            this.headers.set(key, value);
        }
        return this;
    }

    public addIf(condition: boolean, key: string, value?: string | null): this {
        if (condition) {
            this.add(key, value);
        }
        return this;
    }

    public build(): Record<string, string> {
        return Object.fromEntries(this.headers);
    }

    public remove(key: string): this {
        this.headers.delete(key);
        return this;
    }

    public get(key: string): undefined | string {
        return this.headers.get(key);
    }

    public reset(): this {
        this.headers.clear();
        return this;
    }

    public has(key: string): boolean {
        return this.headers.has(key);
    }

    public toHeaders(): Headers {
        return new Headers(this.build());
    }

    private validateKey(key: string): void {
        if (!VALID_HEADER_KEY_REGEX.test(key)) {
            throw new Error(`Invalid header key: ${key}`);
        }
    }
}
