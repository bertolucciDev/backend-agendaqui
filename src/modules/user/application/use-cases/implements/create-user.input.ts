import { Role } from '../../../../../shared/types/role.type';

export class CreateUserInput {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role?: Role,
  ) {}
}
