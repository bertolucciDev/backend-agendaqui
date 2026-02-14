import { User } from '../entities/user.entity';

export abstract class UserRepo {
  abstract findById(id: string): Promise<User | null>;
}
