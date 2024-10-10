import { Repository } from 'typeorm';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';
export declare class InvestmentService {
    private readonly investmentRepository;
    constructor(investmentRepository: Repository<InvestmentEntity>);
    findAll(): Promise<InvestmentEntity[]>;
    create(investmentData: Partial<InvestmentEntity>): Promise<InvestmentEntity>;
}
