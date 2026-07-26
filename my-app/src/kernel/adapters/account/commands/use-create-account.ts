import type { CreateAccountDto, AccountDto } from '@modules/account';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAccountContext } from '../..';

const ACCOUNT_QUERY_KEY = ['accounts'];

export function useCreateAccount() {
    const queryClient = useQueryClient();
    const { createAccount } = useAccountContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
        },
        mutationFn: (dto: CreateAccountDto): Promise<AccountDto> => createAccount.execute(dto),
    });
}
