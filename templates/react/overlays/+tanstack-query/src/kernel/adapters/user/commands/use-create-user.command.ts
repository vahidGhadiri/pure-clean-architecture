import type { CreateUserDto, UserDto } from '@modules/user';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useUserBoundedContext } from '../..';

const USER_QUERY_KEY = ['users'];

export function useCreateUserCommand() {
    const queryClient = useQueryClient();
    const { createUser } = useUserBoundedContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        },
        mutationFn: (dto: CreateUserDto): Promise<UserDto> => createUser.execute(dto),
    });
}
