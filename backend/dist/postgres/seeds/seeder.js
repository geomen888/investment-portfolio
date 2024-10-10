"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const app_module_1 = require("../../app.module");
const seeder_service_1 = require("./seeder.service");
const optionDefinitions = [
    { name: 'limit', alias: 'l', type: Number, defaultValue: 10 },
    { name: 'help', alias: 'h', type: Boolean },
];
const usage = commandLineUsage([
    {
        header: 'Seeder',
        content: 'Seeds the database with test data.',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'limit',
                typeLabel: '{underline number}',
                description: 'Limit the number of records to seed.',
            },
            {
                name: 'help',
                description: 'Display this usage guide.',
            },
        ],
    },
]);
async function bootstrap() {
    const options = commandLineArgs(optionDefinitions);
    if (options.help) {
        console.log(usage);
        return;
    }
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seederService = app.get(seeder_service_1.SeederService);
    await seederService.seed(options.limit);
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map