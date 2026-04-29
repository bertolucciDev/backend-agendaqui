import { Injectable } from '@nestjs/common';

interface RefreshTokenReturn {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly any: any) {}

  async execute() {}
}
