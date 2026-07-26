import type { AccountType, AccountDto } from './account.dto';

export interface CreateAccountData {
    readonly holderName: string;
    readonly type: AccountType;
    readonly balance: number;
}

export interface UpdateAccountData {
    readonly holderName?: string;
    readonly type?: AccountType;
}

export interface IAccountRepository {
    create(
        data: {
            id: string;
        } & CreateAccountData
    ): Promise<AccountDto>;
    update(id: string, data: UpdateAccountData): Promise<AccountDto>;
    findById(id: string): Promise<AccountDto>;
    delete(id: string): Promise<void>;
    findAll(): Promise<AccountDto[]>;
}
