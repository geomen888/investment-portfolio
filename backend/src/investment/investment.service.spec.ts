import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentService } from './investment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { FundingRound, GoalInvestmentStatus, InvestmentStatus } from './../common/enums';
import { InvestmentEntity } from './../postgres/pg-models/investment.entity';

describe('InvestmentService', () => {
  let service: InvestmentService;
  let investmentRepository: sinon.SinonStubbedInstance<Repository<InvestmentEntity>>;

  beforeEach(async () => {
    investmentRepository = sinon.createStubInstance(Repository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        {
          provide: getRepositoryToken(InvestmentEntity),
          useValue: investmentRepository,
        },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findByCompanyId', () => {
    it('should return an array of investments for a given company ID', async () => {

      const mockInvestments = [
        {
          id: '1',
          amount: 1000,
          company: { id: '123', name: 'Test Company' },
          createdDate: new Date('2024-10-12T10:25:15.952Z'),
          investmentAdmin: 'John Doe',
          fundingRound: FundingRound.SEED,
          description: 'Investment in seed round',
          quantityOnboardedEmployees: 50,
          goalStatus: GoalInvestmentStatus.PENDING,
          status: InvestmentStatus.PENDING,
          simulation: false,
          admin: 'Admin User',
        },
        {
          id: '2',
          amount: 2000,
          company: { id: '123', name: 'Test Company' },
          createdDate: new Date('2024-10-12T11:25:15.952Z'),
          investmentAdmin: 'Jane Doe',
          fundingRound: FundingRound.SERIES_A,
          description: 'Investment in Series A round',
          quantityOnboardedEmployees: 60,
          goalStatus: GoalInvestmentStatus.SUCCESS,
          status: InvestmentStatus.APPROVED,
          simulation: false,
          admin: 'Admin User 2',
        },
      ] as InvestmentEntity[];

      investmentRepository.findOne.resolves(mockInvestments[0]);

      const result = await service.findByCompanyId('123');

      expect(result).toEqual(mockInvestments[0]);
      expect(investmentRepository.findOne.calledOnce).toBe(true);
      expect(investmentRepository.findOne.args[0][0].where.company.id).toEqual('123');
    });
  });

  describe('createInvestment', () => {
    it('should create and save a new investment', async () => {

      const mockInvestment = {
        id: '1',
        amount: 1000,
        company: { id: '123', name: 'Test Company' },
        createdDate: new Date(),
        investmentAdmin: 'John Doe',
        fundingRound: FundingRound.SEED,
        description: 'Investment in seed round',
        quantityOnboardedEmployees: 50,
        goalStatus: GoalInvestmentStatus.PENDING,
        status: InvestmentStatus.PENDING,
        simulation: false,
        admin: 'Admin User',
      } as InvestmentEntity;

      investmentRepository.create.returns(mockInvestment);
      investmentRepository.save.resolves(mockInvestment);

      const investment = {
        amount: 1000,
        company: { id: '123' },
        fundingRound: FundingRound.SEED,
        investmentAdmin: 'John Doe',
      } as InvestmentEntity;

      const result = await service.create(investment);

      expect(result).toEqual(mockInvestment);
      expect(investmentRepository.create.calledOnce).toBe(true);
      expect(investmentRepository.save.calledOnce).toBe(true);
    });
  });
});
