import { Role } from '../../../../../core/enum/role.enum';

export class DeleteUserInput {
  constructor(
    public readonly requesterId: string,
    public readonly requesterRole: Role,
    public readonly targetUserId: string,
    public readonly currentPassword?: string,
  ) {}
}
