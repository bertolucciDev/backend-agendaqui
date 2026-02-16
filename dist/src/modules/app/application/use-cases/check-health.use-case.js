"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckHealthUseCase = void 0;
const common_1 = require("@nestjs/common");
const database_health_repository_1 = require("../../domain/repositories/database-health.repository");
const cache_health_repository_1 = require("../../domain/repositories/cache-health.repository");
let CheckHealthUseCase = class CheckHealthUseCase {
    databaseHealthRepository;
    cacheHealthRepository;
    constructor(databaseHealthRepository, cacheHealthRepository) {
        this.databaseHealthRepository = databaseHealthRepository;
        this.cacheHealthRepository = cacheHealthRepository;
    }
    async execute() {
        const [isDbOnline, isCacheOnline] = await Promise.all([
            this.databaseHealthRepository.checkConnection(),
            this.cacheHealthRepository.checkConnection(),
        ]);
        const response = {
            status: isDbOnline && isCacheOnline ? 'healthy' : 'unhealthy',
            cache: isCacheOnline ? 'healthy' : 'unhealthy',
            database: isDbOnline ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
        };
        return response;
    }
};
exports.CheckHealthUseCase = CheckHealthUseCase;
exports.CheckHealthUseCase = CheckHealthUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_health_repository_1.DatabaseHealthRepository,
        cache_health_repository_1.CacheHealthRepository])
], CheckHealthUseCase);
//# sourceMappingURL=check-health.use-case.js.map