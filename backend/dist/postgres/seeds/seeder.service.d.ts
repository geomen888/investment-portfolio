import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../pg-models/company.entity';
import { InvestmentEntity } from '../pg-models/investment.entity';
export declare class SeederService {
    private readonly CompanyRepo;
    private readonly InvestmentRepo;
    private logger;
    constructor(CompanyRepo: Repository<CompanyEntity>, InvestmentRepo: Repository<InvestmentEntity>, logger: Logger);
    seed(limit: number): Promise<void>;
}
