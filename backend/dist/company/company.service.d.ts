import { Repository } from 'typeorm';
import { CompanyEntity } from '../postgres/pg-models/company.entity';
export declare class CompanyService {
    private readonly companyRepository;
    constructor(companyRepository: Repository<CompanyEntity>);
    findAll(page: number, limit: number): Promise<CompanyEntity[]>;
    create(companyData: Partial<CompanyEntity>): Promise<CompanyEntity>;
}
