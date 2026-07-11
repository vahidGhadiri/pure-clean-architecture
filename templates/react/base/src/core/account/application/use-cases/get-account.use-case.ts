import type { IAccountRepository } from 'src/core/account/domain';
import type { AccountDto } from '../../domain/account.dto';

export class GetAccountUseCase {
    constructor(private readonly repository: IAccountRepository) {}

    public async execute(id: string): Promise<AccountDto> {
        return this.repository.findById(id);
    }
}

export class GetAccountsUseCase {
    constructor(private readonly repository: IAccountRepository) {}

    public async execute(): Promise<AccountDto[]> {
        return this.repository.findAll();
    }
}
