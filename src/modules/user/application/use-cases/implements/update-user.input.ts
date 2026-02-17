import { UpdateUserDTO } from '../../../presentation/dto/input/update-user.dto';
import { Role } from '../../../../../core/enum/role.enum';

export class UpdateUserInput {
  constructor(
    public readonly updateData: Partial<UpdateUserDTO>,
    public readonly requesterId: string,
    public readonly requesterRole: Role,
    public readonly targetUserId: string,
    public readonly currentPassword?: string,
  ) {}
}
