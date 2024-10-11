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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const company_entity_1 = require("../pg-models/company.entity");
const enums_1 = require("../../common/enums");
const investment_entity_1 = require("../pg-models/investment.entity");
let SeederService = class SeederService {
    constructor(CompanyRepo, InvestmentRepo, logger) {
        this.CompanyRepo = CompanyRepo;
        this.InvestmentRepo = InvestmentRepo;
        this.logger = logger;
    }
    async seed(limit) {
        try {
            const existingCompany = await this.CompanyRepo.find();
            if (existingCompany.length) {
                console.log('Company already exist, skipping seeding');
                return;
            }
            const companies = [];
            const investments = [];
            for (let i = 0; i < limit; i++) {
                const tags = generateRandom(enums_1.Tags);
                const fundingRound = faker_1.faker.helpers.enumValue(enums_1.FundingRound);
                const companyEntity = {
                    name: faker_1.faker.company.name(),
                    establishedDate: faker_1.faker.date.between({ from: '2002-01-01', to: '2022-01-05' }),
                    description: faker_1.faker.company.catchPhrase(),
                    tags,
                    valuation: faker_1.faker.finance.amount({
                        min: 1000000,
                        max: 50000000,
                        dec: 0,
                    }),
                    fundingRound,
                    investmentAdmin: faker_1.faker.person.fullName(),
                    verified: faker_1.faker.datatype.boolean(),
                    quantityOfEmployees: faker_1.faker.number.int({ min: 10, max: 500 }),
                    email: faker_1.faker.internet.email(),
                    url: faker_1.faker.internet.url(),
                    address: faker_1.faker.location.streetAddress(),
                    branches: [faker_1.faker.location.city()],
                    countriesOfJurisdiction: [faker_1.faker.location.country()],
                };
                const company = this.CompanyRepo.create(companyEntity);
                companies.push(company);
                const investmentEntity = {
                    company,
                    tags,
                    amount: faker_1.faker.finance.amount({ min: 100000, max: 1000000, dec: 0 }),
                    fundingRound,
                    investmentAdmin: faker_1.faker.person.fullName(),
                    quantityOnboardedEmployees: faker_1.faker.number.int({ min: 10, max: 100 }),
                    goalStatus: faker_1.faker.helpers.enumValue(enums_1.GoalInvestmentStatus),
                    status: faker_1.faker.helpers.enumValue(enums_1.InvestmentStatus),
                    simulation: false,
                };
                const investment = this.InvestmentRepo.create(investmentEntity);
                investments.push(investment);
            }
            await this.CompanyRepo.save(companies);
            await this.InvestmentRepo.save(investments);
            console.log('Database seeding completed successfully.');
            function generateRandom(values) {
                const tagValues = Object.values(values);
                const randomTags = faker_1.faker.helpers.arrayElements(tagValues);
                return randomTags;
            }
        }
        catch (e) {
            this.logger.error(e);
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.CompanyEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(investment_entity_1.InvestmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        common_1.Logger])
], SeederService);
//# sourceMappingURL=seeder.service.js.map