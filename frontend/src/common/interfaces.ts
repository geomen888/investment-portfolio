import { Tags, FundingRound, GoalInvestmentStatus, InvestmentStatus } from './enums';

export interface Company {
 id: string;
 name: string;
 createdDate: Date;
 establishedDate: Date;
 description: string;
 logo: string;
 investments: Investments[];
 judicialRestrictions: boolean;
 tags: Tags[];
 investmentAdmin: string;
 valuation: number;
 verified: boolean;
 fundingRound: FundingRound;
 readyForNextRounds: boolean;
 email: string;
 url: string;
 address: string;
 quantityOfEmployees: number;
}

export interface Investment {
  id: string;
  company: Company;
  amount: number;
  createdDate: Date;
  investmentAdmin: string;
  fundingRound: FundingRound;
  tags: Tags[];
  description: string;
  quantityOnboardedEmployees: number;
  goalStatus: GoalInvestmentStatus;
  status: InvestmentStatus;
  simulation: boolean;
  admin: string;
}
