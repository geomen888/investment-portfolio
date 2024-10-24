import { Tags, FundingRound, GoalInvestmentStatus, InvestmentStatus } from './enums';

export const URL = 'http://localhost:3000';

export const tags = [{
  name: Tags.SASS,
},
{
  name: Tags.FINTECH,
},
{
  name: Tags.FINANCIAL_SERVICES,
},
{
  name: Tags.ENTERPRICE,
},
{
  name: Tags.SOFTWARE_DEV,
},
{
  name: Tags.TOOLS_AI,
},
{
  name: Tags.CONSUMER,
},
{
  name: Tags.REAL_ESTATE,
},
{
  name: Tags.PAYMENTS,
}, 
{
  name: Tags.LOGISTICS_SUPLY_CHAIN,
},
{
  name: Tags.PRODUCTION,
}];

export const foundingRounds = [{
  name: FundingRound.PRE_SEED
},
{
  name: FundingRound.SEED
},
{
  name: FundingRound.SERIES_A
},
{
  name: FundingRound.SERIES_B
},
{
  name: FundingRound.SERIES_C
}];

export const goalStatus = [
  { name: GoalInvestmentStatus.FAILED },
  { name: GoalInvestmentStatus.PAUSED },
  { name: GoalInvestmentStatus.PENDING },
  { name: GoalInvestmentStatus.SUCCESS },
];

export const investmentStatus = [
  { name: InvestmentStatus.REJECTED },
  { name: InvestmentStatus.PAUSED },
  { name: InvestmentStatus.APPROVED },
  { name: InvestmentStatus.PENDING },
];

