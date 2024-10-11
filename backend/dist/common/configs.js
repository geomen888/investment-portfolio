"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurations = exports.Environment = exports.ConfigKey = void 0;
const config_1 = require("@nestjs/config");
var ConfigKey;
(function (ConfigKey) {
    ConfigKey["App"] = "APP";
    ConfigKey["Db"] = "DB";
})(ConfigKey || (exports.ConfigKey = ConfigKey = {}));
var Environment;
(function (Environment) {
    Environment["Local"] = "local";
    Environment["Development"] = "development";
    Environment["Staging"] = "staging";
    Environment["Production"] = "production";
    Environment["Testing"] = "testing";
})(Environment || (exports.Environment = Environment = {}));
const APPConfig = (0, config_1.registerAs)(ConfigKey.App, () => ({
    env: Environment[process.env.NODE_ENV] ||
        Environment.Development,
    port: Number(process.env.APP_PORT) || 3000,
    seeds: process.env.RUN_SEED || true,
    appName: process.env.APP_NAME || 'portfolio-backend',
}));
const DBConfig = (0, config_1.registerAs)(ConfigKey.Db, () => ({
    host: process.env.POSTGRES_HOST || '0.0.0.0',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'portfolio',
}));
exports.configurations = [APPConfig, DBConfig];
//# sourceMappingURL=configs.js.map