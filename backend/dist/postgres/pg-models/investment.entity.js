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
exports.InvestmentEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const company_entity_1 = require("./company.entity");
const enums_1 = require("./../../common/enums");
let InvestmentEntity = class InvestmentEntity {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.InvestmentEntity = InvestmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity, company => company.investments),
    __metadata("design:type", company_entity_1.CompanyEntity)
], InvestmentEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], InvestmentEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], InvestmentEntity.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "investmentAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.FundingRound,
        default: enums_1.FundingRound.PRE_SEED,
    }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "fundingRound", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        array: true,
        enum: enums_1.Tags,
        default: [],
    }),
    __metadata("design:type", Array)
], InvestmentEntity.prototype, "areaOfFunding", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], InvestmentEntity.prototype, "quantityOnboardedEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.GoalInvestmentStatus,
        default: enums_1.GoalInvestmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "goalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.InvestmentStatus,
        default: enums_1.InvestmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InvestmentEntity.prototype, "simulation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvestmentEntity.prototype, "admin", void 0);
exports.InvestmentEntity = InvestmentEntity = __decorate([
    (0, typeorm_1.Entity)('investments')
], InvestmentEntity);
//# sourceMappingURL=investment.entity.js.map