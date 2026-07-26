import { v4 as uuidv4 } from 'uuid';

import type { CreateAccountDto, AccountDto } from '../../domain/account.dto';
import type { IAccountRepository } from 'src/core/account/domain';

export class CreateAccountUseCase {
    constructor(private readonly repository: IAccountRepository) {}

    public async execute(dto: CreateAccountDto): Promise<AccountDto> {
        return this.repository.create({
            balance: dto.initialBalance,
            holderName: dto.holderName,
            type: dto.type,
            id: uuidv4(),
        });
    }
}
