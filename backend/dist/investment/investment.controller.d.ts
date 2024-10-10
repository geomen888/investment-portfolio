import { InvestmentService } from './investment.service';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';
export declare class InvestmentController {
    private readonly investmentService;
    constructor(investmentService: InvestmentService);
    findAll(): Promise<InvestmentEntity[]>;
    create(investData: Partial<InvestmentEntity>): Promise<InvestmentEntity>;
}
