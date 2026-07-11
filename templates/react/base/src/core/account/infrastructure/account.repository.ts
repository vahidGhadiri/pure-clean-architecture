import type { IStorage, IHttp } from '@shared_kernel/contracts';

import type { IAccountRepository, CreateAccountData, UpdateAccountData } from 'src/core/account/domain';
import type { AccountEndpoints } from './account.endpoints';
import type { AccountDto } from '../domain/account.dto';

export class AccountRepository implements IAccountRepository {
    constructor(
        private readonly http: IHttp<typeof AccountEndpoints>,
        private readonly storage: IStorage
    ) {}

    public async findAll(): Promise<AccountDto[]> {
        const cached = this.storage.getStorageData<AccountDto[]>({
            isPersisted: true,
            key: 'accounts',
        });
        if (cached) {
            return cached;
        }

        const accounts = await this.http.request<'GET_ACCOUNTS', AccountDto[]>({
            endpoint: 'GET_ACCOUNTS',
            method: 'GET',
        });

        this.storage.setStorageData({
            isPersisted: true,
            key: 'accounts',
            value: accounts,
        });

        return accounts;
    }

    public async create(
        data: {
            id: string;
        } & CreateAccountData
    ): Promise<AccountDto> {
        return this.http.request<'CREATE_ACCOUNT', AccountDto>({
            body: {
                holderName: data.holderName,
                balance: data.balance,
                type: data.type,
            },
            endpoint: 'CREATE_ACCOUNT',
            method: 'POST',
        });
    }

    public async update(id: string, data: UpdateAccountData): Promise<AccountDto> {
        return this.http.request<'UPDATE_ACCOUNT', AccountDto>({
            endpoint: 'UPDATE_ACCOUNT',
            pathParams: { id },
            method: 'PATCH',
            body: data,
        });
    }

    public async findById(id: string): Promise<AccountDto> {
        return await this.http.request<'GET_ACCOUNT', AccountDto>({
            endpoint: 'GET_ACCOUNT',
            pathParams: { id },
            method: 'GET',
        });
    }

    public async delete(id: string): Promise<void> {
        await this.http.request<'DELETE_ACCOUNT', void>({
            endpoint: 'DELETE_ACCOUNT',
            pathParams: { id },
            method: 'DELETE',
        });
    }

    public sample: IAccountRepository['update'] = async () => {
        return await this.http.request({
            endpoint: 'DELETE_ACCOUNT',
            method: 'GET',
        });
    };
}
