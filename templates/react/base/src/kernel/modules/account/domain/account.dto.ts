export type AccountType = 'CHECKING' | 'SAVINGS';

export interface CreateAccountDto {
    readonly initialBalance: number;
    readonly holderName: string;
    readonly type: AccountType;
}

export interface UpdateAccountDto {
    readonly holderName?: string;
    readonly type?: AccountType;
    readonly id: string;
}

export interface AccountDto {
    readonly holderName: string;
    readonly type: AccountType;
    readonly balance: number;
    readonly id: string;
}
