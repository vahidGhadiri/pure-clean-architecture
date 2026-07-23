import type { UpdateAccountDto, AccountDto } from '@core/account';
import { createAccountContext } from '@core/account';
import { useMemo } from 'react';

import { useMutation } from '../../shared';

function useAccountServices() {
  return useMemo(() => createAccountContext(), []);
}

export function useUpdateAccount() {
  const { updateAccount } = useAccountServices();
  return useMutation<UpdateAccountDto, AccountDto>((dto) => updateAccount.execute(dto));
}
