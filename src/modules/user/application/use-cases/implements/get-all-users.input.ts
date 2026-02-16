import { Role } from '../../../../../shared/types/role.type';

export class GetAllUsersInput {
  constructor(
    public readonly requesterId: string,
    public readonly requesterRole: Role,
  ) {}
}
