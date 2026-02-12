import { Injectable } from '@nestjs/common';
import { DatabaseHealthRepository } from '../../domain/repositories/database-health.repository';
import { ResponseHealthDTO } from '../../presentation/dto/output/response-health.dto';

@Injectable()
export class CheckHealthUseCase {
  constructor(private readonly databaseHealthRepo: DatabaseHealthRepository) {}

  async execute(): Promise<ResponseHealthDTO> {
    const isDbOnline = await this.databaseHealthRepo.checkConnection();

    const response: ResponseHealthDTO = {
      status: isDbOnline ? 'healthy' : 'unhealthy',
      database: isDbOnline ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
    };

    return response;
  }
}
