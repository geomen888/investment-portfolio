import { FundingRound, Tags } from './../../common/enums';
import { InvestmentEntity } from './investment.entity';
export declare class CompanyEntity {
    id: string;
    name: string;
    createdDate: Date;
    establishedDate: Date;
    description: string;
    tags: string[];
    logo: string;
    investments: InvestmentEntity[];
    judicialRestrictions: boolean;
    areaOfFunding: Tags[];
    investmentAdmin: string;
    valuation: number;
    verified: boolean;
    fundingRound: FundingRound;
    readyForNextRounds: boolean;
    email: string;
    url: string;
    address: string;
    branches: string[];
    countriesOfJurisdiction: string[];
    quantityOfEmployees: number;
}
