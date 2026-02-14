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
exports.CheckApiHealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const check_health_use_case_1 = require("../../application/use-cases/check-health.use-case");
const response_health_dto_1 = require("../dto/output/response-health.dto");
let CheckApiHealthController = class CheckApiHealthController {
    checkHealthUseCase;
    constructor(checkHealthUseCase) {
        this.checkHealthUseCase = checkHealthUseCase;
    }
    async checkHealth() {
        return await this.checkHealthUseCase.execute();
    }
};
exports.CheckApiHealthController = CheckApiHealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Check application health',
        description: 'Returns the health status of the app and its dependencies (API, Database...).',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Application and dependencies are healthy',
        type: response_health_dto_1.ResponseHealthDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Critical failure: database is down or all dependencies are down',
        content: {
            'application/json': {
                schema: { $ref: (0, swagger_1.getSchemaPath)(response_health_dto_1.ResponseHealthDTO) },
                examples: {
                    databaseDown: {
                        summary: 'Database offline (API unavailable)',
                        value: {
                            status: 'unhealthy',
                            database: 'unhealthy',
                            timestamp: '2025-09-21T12:00:00.000Z',
                        },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CheckApiHealthController.prototype, "checkHealth", null);
exports.CheckApiHealthController = CheckApiHealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, swagger_1.ApiExtraModels)(response_health_dto_1.ResponseHealthDTO),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [check_health_use_case_1.CheckHealthUseCase])
], CheckApiHealthController);
//# sourceMappingURL=check-api-health.controller.js.map