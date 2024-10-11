import { CompanyEntity } from './company.entity';
import { FundingRound, InvestmentStatus, Tags, GoalInvestmentStatus } from './../../common/enums';
export declare class InvestmentEntity {
    id: string;
    company: CompanyEntity;
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
