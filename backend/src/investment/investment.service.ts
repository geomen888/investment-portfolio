import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';
import { CompanyEntity } from '../postgres/pg-models/company.entity';

import { CompanyService } from '../company/company.service';
@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(InvestmentEntity)
    private readonly investmentRepository: Repository<InvestmentEntity>,
    private readonly companyService: CompanyService,
  ) {}

  async findAll(): Promise<InvestmentEntity[]> {
    const investments = await this.investmentRepository.find({
      relations: ['company'],
      order: {
        createdDate: 'DESC',
      },
    });

    return investments.map((investment) => ({
      ...investment,
      companyId: investment.company.id,
    }));
  }

  async findCompanyByCompanyId(companyId: string): Promise<CompanyEntity> {
    return this.companyService.getCompanyById(companyId);
  }

  async findInvestmentsByCompanyId(
    companyId: string,
  ): Promise<InvestmentEntity[]> {
    return this.investmentRepository.find({
      relations: ['company'],
      where: {
        company: {
          id: companyId,
        },
      },
      order: {
        createdDate: 'DESC',
      },
    });
  }

  async create(
    investmentData: Partial<InvestmentEntity>,
  ): Promise<InvestmentEntity> {
    const investment = this.investmentRepository.create(investmentData);
    return this.investmentRepository.save(investment);
  }

  async createWithComanyId(
    investmentData: Partial<InvestmentEntity>,
  ): Promise<InvestmentEntity> {
    try {
      if (!('companyId' in investmentData)) {
        return;
      }

      const companyId = investmentData['companyId'] as string;
      const company = await this.findCompanyByCompanyId(companyId);

      if (!company) {
        throw new NotFoundException(`Company ID ${companyId} not found`);
      }

      investmentData.company = company;

      const investment = this.investmentRepository.create(investmentData);

      return this.investmentRepository.save(investment);
    } catch (e) {
      console.error(e);
    }
  }

  async updateWithComanyId(
    investmentData: Partial<InvestmentEntity>,
  ): Promise<InvestmentEntity> {
    try {
      const investment = await this.investmentRepository.findOne({
        relations: ['company'],
        where: { id: investmentData.id },
      });

      if (!investment) {
        throw new NotFoundException(
          `Investment with ID ${investmentData.id} not found`,
        );
      }

      const companyId = investment.company.id;

      const company = await this.findCompanyByCompanyId(companyId);

      if (!company) {
        throw new NotFoundException(`Company ID ${companyId} not found`);
      }

      Object.assign(investment, investmentData);
      investment.company = company;

      return this.investmentRepository.save(investment);
    } catch (e) {
      console.error(e);
    }
  }
}
