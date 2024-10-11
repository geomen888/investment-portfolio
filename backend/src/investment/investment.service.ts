import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(InvestmentEntity)
    private readonly investmentRepository: Repository<InvestmentEntity>,
  ) {}

  async findAll(): Promise<InvestmentEntity[]> {
    return this.investmentRepository.find({ relations: ['company'] });
  }

  async create(investmentData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {
    const investment = this.investmentRepository.create(investmentData);
    return this.investmentRepository.save(investment);
  }

}
