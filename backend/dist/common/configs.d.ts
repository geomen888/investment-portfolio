export declare enum ConfigKey {
    App = "APP",
    Db = "DB"
}
export declare enum Environment {
    Local = "local",
    Development = "development",
    Staging = "staging",
    Production = "production",
    Testing = "testing"
}
export declare const configurations: (((() => {
    env: Environment;
    port: number;
    seeds: string | boolean;
    appName: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    env: Environment;
    port: number;
    seeds: string | boolean;
    appName: string;
}>) | ((() => {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>))[];
