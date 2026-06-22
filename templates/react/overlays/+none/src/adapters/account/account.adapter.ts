import type { CreateAccountDto, UpdateAccountDto, AccountDto } from '@core/account';
import { createAccountContext } from '@core/account';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useAccountContext() {
    return useMemo(() => createAccountContext(), []);
}

export function useAccounts() {
    const { getAccounts } = useAccountContext();
    const [accounts, setAccounts] = useState<AccountDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        setIsLoading(true);
        try {
            const data = await getAccounts.execute();
            setAccounts(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refetch();
    }, [getAccounts]);

    return { accounts, isLoading, refetch, error };
}

export function useCreateAccount() {
    const { createAccount } = useAccountContext();
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (dto: CreateAccountDto): Promise<AccountDto> => {
            setLoading(true);
            try {
                return await createAccount.execute(dto);
            } finally {
                setLoading(false);
            }
        },
        [createAccount]
    );

    return { execute, loading };
}

export function useUpdateAccount() {
    const { updateAccount } = useAccountContext();
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (dto: UpdateAccountDto): Promise<AccountDto> => {
            setLoading(true);
            try {
                return await updateAccount.execute(dto);
            } finally {
                setLoading(false);
            }
        },
        [updateAccount]
    );

    return { execute, loading };
}
