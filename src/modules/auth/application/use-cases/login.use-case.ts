import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AbstractUserReadRepository } from '../../../user/domain/repositories/user.read-repository';
import { UserResponseDTO } from '../../../user/presentation/dto/output/user-response.dto';
import { Email } from '../../../../core/value-objects/email.vo';
import { LoginDTO } from '../../presentation/dto/input/login.dto';
import { AbstractAuthTokenCacheWriteRepository } from '../../domain/repositories/auth-token-cache.write-repository';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { Token } from '../../../../core/value-objects/token.vo';
import { env } from '../../../../config/env';
import { parseTimeToSeconds } from '../../../../shared/utils/time.util';
import { LoginResponseDTO } from '../../presentation/dto/output/login-response.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authTokenCacheWriteRepository: AbstractAuthTokenCacheWriteRepository,
    private readonly userReadRepository: AbstractUserReadRepository,
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponseDTO> {
    const email = new Email(dto.email);
    const existingUser = await this.userReadRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await existingUser.comparePassword(dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!existingUser.isUserVerified()) {
      throw new UnauthorizedException('Email not verified');
    }

    const refreshPayload = {
      sub: existingUser.getId(),
      role: existingUser.getRole(),
      type: 'refresh',
      jti: randomUUID(),
    };

    const refreshToken = new Token(
      this.jwtService.sign(refreshPayload, {
        expiresIn: parseTimeToSeconds(env.REFRESH_TOKEN_EXP),
      }),
    );

    await this.authTokenCacheWriteRepository.setRefreshToken(
      existingUser.getId(),
      refreshToken.getValue(),
      parseTimeToSeconds(env.REFRESH_TOKEN_EXP),
    );

    await this.authTokenCacheWriteRepository.setSession(
      existingUser.getId(),
      { refreshToken },
      parseTimeToSeconds(env.REFRESH_TOKEN_EXP),
    );

    const accessToken = new Token(
      this.jwtService.sign(
        { sub: existingUser.getId(), role: existingUser.getRole() },
        { expiresIn: parseTimeToSeconds(env.ACCESS_TOKEN_EXP) },
      ),
    );

    return new LoginResponseDTO(
      new UserResponseDTO(existingUser),
      accessToken.getValue(),
      refreshToken.getValue(),
    );
  }
}
