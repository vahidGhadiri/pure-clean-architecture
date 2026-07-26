export interface SetStorageData<Value = unknown> {
    isPersisted: boolean;
    value: Value;
    key: string;
}

export interface GetStorageData {
    isPersisted: boolean;
    key: string;
}

export interface RemoveStorageItem {
    isPersisted: boolean;
    key: string;
}

export interface IStorage {
    clear(
        payload:
            | {
                  isPersisted: boolean;
              }
            | boolean
    ): void;
    setStorageData<Value>(data: SetStorageData<Value>[] | SetStorageData<Value>): void;
    getStorageData<Value>(data: GetStorageData): Value | null;
    removeItem(data: RemoveStorageItem): void;
}
