import { Role } from '../../../../../core/enum/role.enum';

export class GetAllUsersInput {
  constructor(
    public readonly requesterId: string,
    public readonly requesterRole: Role,
  ) {}
}
