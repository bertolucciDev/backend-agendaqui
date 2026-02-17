"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const shared_module_1 = require("../../shared/shared.module");
const check_health_use_case_1 = require("./application/use-cases/check-health.use-case");
const check_api_health_controller_1 = require("./presentation/controller/check-api-health.controller");
const prisma_health_provider_1 = require("./infra/repositories/prisma-health.provider");
const database_health_repository_1 = require("./domain/repositories/database-health.repository");
const cache_health_repository_1 = require("./domain/repositories/cache-health.repository");
const redis_health_provider_1 = require("./infra/repositories/redis-health.provider");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [check_api_health_controller_1.CheckApiHealthController],
        providers: [
            check_health_use_case_1.CheckHealthUseCase,
            {
                provide: cache_health_repository_1.CacheHealthRepository,
                useClass: redis_health_provider_1.RedisHealthRepository,
            },
            {
                provide: database_health_repository_1.DatabaseHealthRepository,
                useClass: prisma_health_provider_1.PrismaHealthRepository,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map