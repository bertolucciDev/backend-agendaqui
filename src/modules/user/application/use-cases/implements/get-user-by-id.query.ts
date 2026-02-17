import { Role } from '../../../../../core/enum/role.enum';

export class GetUserByIdInput {
  constructor(
    public readonly requesterId: string,
    public readonly requesterRole: Role,
    public readonly targetUserId: string,
  ) {}
}
