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
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("./common/config.module");
const db_pg_module_1 = require("./postgres/db-pg.module");
const company_entity_1 = require("./postgres/pg-models/company.entity");
const investment_entity_1 = require("./postgres/pg-models/investment.entity");
const seeder_service_1 = require("./postgres/seeds/seeder.service");
const company_module_1 = require("./company/company.module");
const investment_module_1 = require("./investment/investment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigsModule,
            db_pg_module_1.DbPgModule,
            typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, investment_entity_1.InvestmentEntity]),
            company_module_1.CompanyModule,
            investment_module_1.InvestmentModule
        ],
        providers: [seeder_service_1.SeederService, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map