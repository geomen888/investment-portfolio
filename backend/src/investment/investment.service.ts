import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(InvestmentEntity)
    private readonly investmentRepository: Repository<InvestmentEntity>,
  ) { }

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

  async findByCompanyId(companyId: string): Promise<InvestmentEntity> {
    return this.investmentRepository.findOne({
      relations: ['company'],
      where: {
        company: { id: companyId },
      }
    });
  }

  async create(investmentData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {

    const investment = this.investmentRepository.create(investmentData);
    return this.investmentRepository.save(investment);
  }

  async createWithComanyId(investmentData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {
    try {
      if (!('companyId' in investmentData)) {

        return;
      }

      const companyId = investmentData['companyId'] as string;
      const { company } = await this.findByCompanyId(companyId);

      investmentData.company = company;

      const investment = this.investmentRepository.create(investmentData);

      return this.investmentRepository.save(investment);

    } catch (e) {
      console.error(e);
    }
  }

  async updateWithComanyId(investmentData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {
    try {

      const investment = await this.investmentRepository.findOne({
        relations: ['company'],
        where: { id: investmentData.id }
      });

      if (!investment) {
        throw new NotFoundException(`Investment with ID ${investmentData.id} not found`);
      }

      const companyId = investment.company.id;

      const { company } = await this.findByCompanyId(companyId);
      Object.assign(investment, investmentData);
      investment.company = company;

      return this.investmentRepository.save(investment);

    } catch (e) {
      console.error(e);
    }
  }
}
