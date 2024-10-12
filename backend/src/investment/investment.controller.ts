import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { InvestmentService  } from './investment.service';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  async findAll(): Promise<InvestmentEntity[]> {
    return this.investmentService.findAll();
  }

  @Post()
  async create(@Body() investData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {
    return this.investmentService.createWithComanyId(investData);
  }

  @Put()
  async update(@Body() investData: Partial<InvestmentEntity>): Promise<InvestmentEntity> {
    return this.investmentService.updateWithComanyId(investData);
  }
}
