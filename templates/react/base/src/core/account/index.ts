import { createHttp } from '@shared_kernel/infrastructure/http';
import { Storage } from '@shared_kernel/infrastructure/storage';

import type {
    CreateAccountUseCase,
    UpdateAccountUseCase,
    GetAccountsUseCase,
    GetAccountUseCase,
    CreateAccountDto,
    UpdateAccountDto,
    AccountType,
    AccountDto,
} from './application';
import type { AccountDeps } from './account.context';
import { AccountEndpoints, createAccountContext as createBaseAccountContext } from './account.context';

export type { CreateAccountDto, UpdateAccountDto, AccountDto };
export { AccountEndpoints };
export type { AccountType };

export interface AccountContext {
    readonly createAccount: CreateAccountUseCase;
    readonly updateAccount: UpdateAccountUseCase;
    readonly getAccounts: GetAccountsUseCase;
    readonly getAccount: GetAccountUseCase;
}

export function createAccountContext(overrides?: Partial<AccountDeps>): AccountContext {
    const container: AccountDeps = {
        http: overrides?.http ?? createHttp(AccountEndpoints),
        storage: overrides?.storage ?? new Storage(),
    };
    return createBaseAccountContext(container);
}
