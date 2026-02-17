import { Role } from '../../../../core/enum/role.enum';

export interface JwtUser {
  sub: string;
  role: Role;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
