import type { UpdateAccountDto, AccountDto } from '../../domain/account.dto';
import type { IAccountRepository } from 'src/core/account/domain';

export class UpdateAccountUseCase {
    constructor(private readonly repository: IAccountRepository) {}

    public async execute(dto: UpdateAccountDto): Promise<AccountDto> {
        return this.repository.update(dto.id, {
            holderName: dto.holderName,
            type: dto.type,
        });
    }
}
