import { FundingRound, Tags } from './../../common/enums';
import { InvestmentEntity } from './investment.entity';
export declare class CompanyEntity {
    id: string;
    name: string;
    createdDate: Date;
    establishedDate: Date;
    description: string;
    logo: string;
    investments: InvestmentEntity[];
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
