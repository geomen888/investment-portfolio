"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbPgModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let DbPgModule = class DbPgModule {
};
exports.DbPgModule = DbPgModule;
exports.DbPgModule = DbPgModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB.host'),
                    port: configService.get('DB.port'),
                    username: configService.get('DB.username'),
                    password: configService.get('DB.password'),
                    database: configService.get('DB.database'),
                    migrationsTableName: 'migration',
                    migrations: [__dirname + '/migrations/*{.ts,.js}'],
                    entities: [__dirname + '/pg-models/*.entity{.ts,.js}'],
                    synchronize: true,
                    logging: true,
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DbPgModule);
//# sourceMappingURL=db-pg.module.js.map