import type { IStorage, IHttp } from '@shared_kernel/contracts';
import { createContext } from '@shared_kernel/composition';

import { CreateAccountUseCase, UpdateAccountUseCase, GetAccountsUseCase, GetAccountUseCase } from './application';
import { AccountRepository, AccountEndpoints } from './infrastructure';

export { AccountEndpoints };

export interface AccountDeps {
  http: IHttp<typeof AccountEndpoints>;
  storage: IStorage;
}

export const createAccountContext = createContext<
  AccountDeps,
  AccountRepository,
  {
    createAccount: CreateAccountUseCase;
    updateAccount: UpdateAccountUseCase;
    getAccounts: GetAccountsUseCase;
    getAccount: GetAccountUseCase;
  }
>({
  createServices: (repository) => ({
    createAccount: new CreateAccountUseCase(repository),
    updateAccount: new UpdateAccountUseCase(repository),
    getAccounts: new GetAccountsUseCase(repository),
    getAccount: new GetAccountUseCase(repository),
  }),
  createRepository: ({ storage, http }) => new AccountRepository(http, storage),
});
