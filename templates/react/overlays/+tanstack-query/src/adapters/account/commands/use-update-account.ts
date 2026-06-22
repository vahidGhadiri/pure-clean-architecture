import type { UpdateAccountDto, AccountDto } from '@core/account';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAccountContext } from '../..';

const ACCOUNT_QUERY_KEY = ['accounts'];

export function useUpdateAccount() {
    const queryClient = useQueryClient();
    const { updateAccount } = useAccountContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
        },
        mutationFn: (dto: UpdateAccountDto): Promise<AccountDto> => updateAccount.execute(dto),
    });
}
