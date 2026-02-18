import { User } from '../../../../modules/user/domain/entities/user.entity';
import { UserResponseDTO } from '../../presentation/dto/output/user-response.dto';

export class UserMapper {
  static toDTO(entity: User): UserResponseDTO {
    return new UserResponseDTO(entity);
  }

  static toDTOList(entities: User[]): UserResponseDTO[] {
    return entities.map((user) => new UserResponseDTO(user));
  }
}
