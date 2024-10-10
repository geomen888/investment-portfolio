"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentStatus = exports.GoalInvestmentStatus = exports.Tags = exports.FundingRound = void 0;
var FundingRound;
(function (FundingRound) {
    FundingRound["PRE_SEED"] = "PRE_SEED";
    FundingRound["SEED"] = "SEED";
    FundingRound["SERIES_A"] = "SERIES_A";
    FundingRound["SERIES_B"] = "SERIES_B";
    FundingRound["SERIES_C"] = "SERIES_C";
})(FundingRound || (exports.FundingRound = FundingRound = {}));
var Tags;
(function (Tags) {
    Tags["SASS"] = "SaaS";
    Tags["FINTECH"] = "FinTech";
    Tags["FINANCIAL_SERVICES"] = "Financial Service";
    Tags["ENTERPRICE"] = "Enterprise";
    Tags["SOFTWARE_DEV"] = "Software Developer";
    Tags["TOOLS_AI"] = "Tools AI";
    Tags["FOOD_BEVERAGES"] = "Food & Beverages";
    Tags["CONSUMER"] = "Consumer";
    Tags["REAL_ESTATE"] = "Real Estate";
    Tags["PAYMENTS"] = "Payments";
    Tags["LOGISTICS_SUPLY_CHAIN"] = "Logistics and Supply Chain";
    Tags["PRODUCTION"] = "Production";
})(Tags || (exports.Tags = Tags = {}));
var GoalInvestmentStatus;
(function (GoalInvestmentStatus) {
    GoalInvestmentStatus["PENDING"] = "pending";
    GoalInvestmentStatus["PAUSED"] = "paused";
    GoalInvestmentStatus["FAILED"] = "failed";
    GoalInvestmentStatus["SICCESS"] = "success";
})(GoalInvestmentStatus || (exports.GoalInvestmentStatus = GoalInvestmentStatus = {}));
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["PENDING"] = "pending";
    InvestmentStatus["APPROVED"] = "approved";
    InvestmentStatus["REJECTED"] = "rejected";
    InvestmentStatus["PAUSED"] = "paused";
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
//# sourceMappingURL=enums.js.map