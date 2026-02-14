import { DatabaseHealthRepository } from '../../domain/repositories/database-health.repository';
import { ResponseHealthDTO } from '../../presentation/dto/output/response-health.dto';
export declare class CheckHealthUseCase {
    private readonly databaseHealthRepo;
    constructor(databaseHealthRepo: DatabaseHealthRepository);
    execute(): Promise<ResponseHealthDTO>;
}
