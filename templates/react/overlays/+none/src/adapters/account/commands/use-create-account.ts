import type { CreateAccountDto, AccountDto } from '@core/account';
import { createAccountContext } from '@core/account';
import { useMemo } from 'react';

import { useMutation } from '../../shared';

function useAccountServices() {
  return useMemo(() => createAccountContext(), []);
}

export function useCreateAccount() {
  const { createAccount } = useAccountServices();
  return useMutation<CreateAccountDto, AccountDto>((dto) => createAccount.execute(dto));
}
