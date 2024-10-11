import { CompanyService } from './company.service';
import { CompanyEntity } from '../postgres/pg-models/company.entity';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    findPaginate(page?: number, limit?: number): Promise<CompanyEntity[]>;
    findAll(): Promise<CompanyEntity[]>;
    create(companyData: Partial<CompanyEntity>): Promise<CompanyEntity>;
    update(companyData: Partial<CompanyEntity>): Promise<CompanyEntity>;
}
