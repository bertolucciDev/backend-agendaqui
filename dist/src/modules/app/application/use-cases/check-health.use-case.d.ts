import { DatabaseHealthRepository } from '../../domain/repositories/database-health.repository';
import { ResponseHealthDTO } from '../../presentation/dto/output/response-health.dto';
import { CacheHealthRepository } from '../../domain/repositories/cache-health.repository';
export declare class CheckHealthUseCase {
    private readonly databaseHealthRepository;
    private readonly cacheHealthRepository;
    constructor(databaseHealthRepository: DatabaseHealthRepository, cacheHealthRepository: CacheHealthRepository);
    execute(): Promise<ResponseHealthDTO>;
}
