import { HealthStatus } from '../../../../../core/types/health-status.type';
export declare class ResponseHealthDTO {
    status: HealthStatus;
    cache: HealthStatus;
    database: HealthStatus;
    timestamp: string;
    constructor(props: Partial<ResponseHealthDTO>);
}
