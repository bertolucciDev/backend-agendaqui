import { ResponseUserDTO } from '../../../../user/presentation/dto/output/response-user.dto';

export class CreateUserSessionCommand {
  constructor(public readonly responseUserDTO: ResponseUserDTO) {}
}
