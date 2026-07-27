import type { UserDto } from '@modules/user';
import { useQuery } from '@tanstack/react-query';

import { useUserBoundedContext } from '../..';

const USER_QUERY_KEY = ['users'];

export function useGetUsersQuery() {
    const { getUsers } = useUserBoundedContext();

    const { isLoading, refetch, error, data } = useQuery({
        queryFn: (): Promise<UserDto[]> => getUsers.execute(),
        queryKey: USER_QUERY_KEY,
    });

    return { users: data ?? [], isLoading, refetch, error };
}
