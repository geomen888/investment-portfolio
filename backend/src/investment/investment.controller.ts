import { Controller, Get, Post, Put, Body, ValidationPipe } from '@nestjs/common';
import { InvestmentService  } from './investment.service';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  async findAll(): Promise<InvestmentEntity[]> {
    return this.investmentService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) createInvestmentDto: CreateInvestmentDto, ): Promise<InvestmentEntity> {
    return this.investmentService.createWithComanyId(createInvestmentDto);
  }

  @Put()
  async update(@Body(ValidationPipe) updateInvestmentDto: UpdateInvestmentDto): Promise<InvestmentEntity> {
    return this.investmentService.updateWithComanyId(updateInvestmentDto);
  }
}
