import { HealthStatus } from '../../../../../shared/types/health-status.type';
export declare class ResponseHealthDTO {
    status: HealthStatus;
    database: HealthStatus;
    timestamp: string;
    constructor(props: Partial<ResponseHealthDTO>);
}
