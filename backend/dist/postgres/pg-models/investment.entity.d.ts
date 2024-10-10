import { CompanyEntity } from './company.entity';
import { FundingRound, Tags } from './../../common/enums';
export declare class InvestmentEntity {
    id: string;
    company: CompanyEntity;
    amount: number;
    createdDate: Date;
    investmentAdmin: string;
    fundingRound: FundingRound;
    areaOfFunding: Tags[];
    description: string;
    quantityOnboardedEmployees: number;
    goalStatus: string;
    status: string;
    simulation: boolean;
    admin: string;
}
