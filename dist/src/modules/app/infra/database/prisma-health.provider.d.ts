import { DatabaseHealthRepository } from '../../domain/repositories/database-health.repository';
import { PrismaService } from '@/shared/infra/database/prisma/prisma.service';
export declare class PrismaHealthRepository implements DatabaseHealthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkConnection(): Promise<boolean>;
}
