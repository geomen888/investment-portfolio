import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyEntity } from '../postgres/pg-models/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('paginate')
  async findPaginate(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<CompanyEntity[]> {
    return this.companyService.findPaginate(page, limit);
  }

  @Get()
  async findAll(): Promise<CompanyEntity[]> {
    return this.companyService.findAll();
  }

  @Post()
  async create(@Body() companyData: Partial<CompanyEntity>): Promise<CompanyEntity> {
    return this.companyService.create(companyData);
  }
}
