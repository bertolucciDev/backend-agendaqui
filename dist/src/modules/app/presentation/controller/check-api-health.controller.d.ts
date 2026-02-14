import { CheckHealthUseCase } from '../../application/use-cases/check-health.use-case';
import { ResponseHealthDTO } from '../dto/output/response-health.dto';
export declare class CheckApiHealthController {
    private readonly checkHealthUseCase;
    constructor(checkHealthUseCase: CheckHealthUseCase);
    checkHealth(): Promise<ResponseHealthDTO>;
}
