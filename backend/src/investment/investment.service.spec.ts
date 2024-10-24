import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentService } from './investment.service';
import { CompanyService } from './../company/company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundingRound, GoalInvestmentStatus, InvestmentStatus } from './../common/enums';
import { InvestmentEntity } from './../postgres/pg-models/investment.entity';
import { CompanyEntity } from './../postgres/pg-models/company.entity';

import * as sinon from 'sinon';

const created = new Date('2024-10-24T10:10:54.324Z');
describe('InvestmentService', () => {
  let service: InvestmentService;
  let companyService: CompanyService;
  let investmentRepository: sinon.SinonStubbedInstance<Repository<InvestmentEntity>>;
  let companyRepository: sinon.SinonStubbedInstance<Repository<CompanyEntity>>;

  beforeEach(async () => {
    investmentRepository = sinon.createStubInstance(Repository);
    companyRepository = sinon.createStubInstance(Repository);
    const mockCompanyService = {
      getCompanyById: jest.fn().mockResolvedValue({ id: '1', name: 'Test Company' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        {
          provide: getRepositoryToken(InvestmentEntity),
          useValue: investmentRepository,
        },
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
    companyService = module.get<CompanyService>(CompanyService);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findByCompanyId', () => {
    it('should return an investments for a given company ID', async () => {
      const mockInvestments = [
        {
          id: '1',
          amount: 1000,
          createdDate: created, 
          company: { id: '1', name: 'Test Company' },
          investmentAdmin: 'John Doe',
          fundingRound: FundingRound.SEED,
          description: 'Investment in seed round',
          quantityOnboardedEmployees: 50,
          goalStatus: GoalInvestmentStatus.PENDING,
          status: InvestmentStatus.PENDING,
          simulation: false,
          admin: 'Admin User',
        },
      ] as InvestmentEntity[];
    
      jest.spyOn(investmentRepository, 'find').mockResolvedValue(mockInvestments);
    
      const result = await service.findInvestmentsByCompanyId('1');
    
      expect(result).toEqual(mockInvestments); 
      expect(investmentRepository.find).toHaveBeenCalledWith({
        relations: ['company'],
        where: {
          company: {
            id: '1'
          }
        },
        order: {
          createdDate: 'DESC',
        },
      });
    });
  });

  describe('createInvestment', () => {
    it('should create and save a new investment', async () => {
        const mockInvestment = {
          id: '1',
          amount: 1000,
          company: { id: '1', name: 'Test Company' },
          companyId: '1',
          createdDate: created,
          investmentAdmin: 'John Doe',
          fundingRound: FundingRound.SEED,
          description: 'Investment in seed round',
          quantityOnboardedEmployees: 50,
          goalStatus: GoalInvestmentStatus.PENDING,
          status: InvestmentStatus.PENDING,
          simulation: false,
          admin: 'Admin User',
        } as unknown as InvestmentEntity;
      
        jest.spyOn(investmentRepository, 'create').mockReturnValue(mockInvestment);
        jest.spyOn(investmentRepository, 'save').mockResolvedValue(mockInvestment);
      
        jest.spyOn(companyService, 'getCompanyById').mockResolvedValue({
          id: '1',
          name: 'Test Company',
          createdDate: created,
          description: 'A test company',
          logo: 'company-logo.png',
          establishedDate: new Date('2020-01-01'),
          address: '123 Test Street',
          email: 'test@company.com',
          tags: ['FinTech', 'SaaS'],
          valuation: 1000000,
          quantityOfEmployees: 100,
          verified: true,
        } as CompanyEntity);
      
        const investment = {
          amount: 1000,
          companyId: '1',
          fundingRound: FundingRound.SEED,
          investmentAdmin: 'John Doe',
        } as unknown as InvestmentEntity;
      
        const result = await service.createWithComanyId(investment);
      
        expect(result).toEqual(mockInvestment);
        expect(companyService.getCompanyById).toHaveBeenCalledWith('1');

        expect(investmentRepository.create).toHaveBeenCalledWith(investment);
        expect(investmentRepository.save).toHaveBeenCalledWith(mockInvestment);
      });
  });
});
