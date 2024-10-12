import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from '../postgres/pg-models/company.entity';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { NotFoundException } from '@nestjs/common';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: sinon.SinonStubbedInstance<Repository<CompanyEntity>>;

  beforeEach(async () => {
    companyRepository = sinon.createStubInstance(Repository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: companyRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  afterEach(() => {
    sinon.restore(); 
  });

  describe('findPaginate', () => {
    it('should return a paginated list of companies', async () => {
      const mockCompanies = [
        { id: '1', name: 'Company 1', investments: [] },
        { id: '2', name: 'Company 2', investments: [] },
      ] as CompanyEntity[];

      companyRepository.find.resolves(mockCompanies);

      const result = await service.findPaginate(1, 10);

      expect(result).toEqual(mockCompanies);
      expect(companyRepository.find.calledOnce).toBe(true); 
      expect(companyRepository.find.args[0][0].take).toEqual(10);
    });
  });

  describe('findAll', () => {
    it('should return a list of all companies, ordered by createdDate DESC', async () => {
      const mockCompanies = [
        { id: '1', name: 'Company 1', createdDate: new Date(), investments: [] },
        { id: '2', name: 'Company 2', createdDate: new Date(), investments: [] },
      ] as CompanyEntity[];

      companyRepository.find.resolves(mockCompanies);

      const result = await service.findAll();

      expect(result).toEqual(mockCompanies);
      expect(companyRepository.find.calledOnce).toBe(true);
      expect(companyRepository.find.args[0][0].order).toEqual({ createdDate: 'DESC' }); 
    });
  });

  describe('create', () => {
    it('should create and save a new company', async () => {
      const mockCompany = { id: '1', name: 'New Company' } as CompanyEntity;

      companyRepository.create.returns(mockCompany);
      companyRepository.save.resolves(mockCompany);

      const result = await service.create({ name: 'New Company' });

      expect(result).toEqual(mockCompany);
      expect(companyRepository.create.calledOnce).toBe(true); 
      expect(companyRepository.save.calledOnce).toBe(true);  
    });
  });

  describe('update', () => {
    it('should update an existing company', async () => {
      const mockCompany = { id: '1', name: 'Updated Company' } as CompanyEntity;

      companyRepository.findOne.resolves(mockCompany);
      companyRepository.save.resolves(mockCompany);

      const result = await service.update('1', { name: 'Updated Company' });

      expect(result).toEqual(mockCompany);
      expect(companyRepository.findOne.calledOnce).toBe(true); 
      expect(companyRepository.save.calledOnce).toBe(true);    
    });

    it('should throw NotFoundException if company does not exist', async () => {
      companyRepository.findOne.resolves(null);

      await expect(service.update('1', { name: 'Non-Existent Company' })).rejects.toThrow(NotFoundException);
      expect(companyRepository.findOne.calledOnce).toBe(true); 
      expect(companyRepository.save.notCalled).toBe(true);     
    });
  });
});
