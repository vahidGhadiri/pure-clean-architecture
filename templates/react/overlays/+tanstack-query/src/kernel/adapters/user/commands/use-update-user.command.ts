import type { UpdateUserDto, UserDto } from '@modules/user';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useUserBoundedContext } from '../..';

const USER_QUERY_KEY = ['users'];

export function useUpdateUserCommand() {
    const queryClient = useQueryClient();
    const { updateUser } = useUserBoundedContext();

    return useMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
        },
        mutationFn: (dto: UpdateUserDto): Promise<UserDto> => updateUser.execute(dto),
    });
}
