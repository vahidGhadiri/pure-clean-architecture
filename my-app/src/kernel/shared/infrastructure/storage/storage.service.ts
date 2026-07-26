import type { RemoveStorageItem, SetStorageData, GetStorageData, IStorage } from '@shared_kernel/contracts';

export default class Storage implements IStorage {
    private readonly memoryStore = new Map<string, unknown>();

    public setStorageData<Value>(data: SetStorageData<Value>[] | SetStorageData<Value>): void {
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
            if (item.isPersisted) {
                localStorage.setItem(item.key, JSON.stringify(item.value));
            } else {
                this.memoryStore.set(item.key, item.value);
            }
        }
    }

    public clear(
        payload:
            | {
                  isPersisted: boolean;
              }
            | boolean
    ): void {
        const isPersisted = typeof payload === 'boolean' ? payload : payload.isPersisted;
        if (isPersisted) {
            localStorage.clear();
        } else {
            this.memoryStore.clear();
        }
    }

    public getStorageData<Value>(data: GetStorageData): Value | null {
        if (data.isPersisted) {
            const raw = localStorage.getItem(data.key);
            if (raw === null) return null;
            return JSON.parse(raw) as Value;
        }
        return (this.memoryStore.get(data.key) as Value) ?? null;
    }

    public removeItem(data: RemoveStorageItem): void {
        if (data.isPersisted) {
            localStorage.removeItem(data.key);
        } else {
            this.memoryStore.delete(data.key);
        }
    }
}
