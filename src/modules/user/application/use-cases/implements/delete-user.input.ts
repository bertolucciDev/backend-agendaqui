import { Role } from '../../../../../shared/types/role.type';

export class DeleteUserInput {
  constructor(
    public readonly requesterId: string,
    public readonly requesterRole: Role,
    public readonly targetUserId: string,
    public readonly currentPassword?: string,
  ) {}
}
