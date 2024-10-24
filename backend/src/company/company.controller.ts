import { Controller, Get, Post, Body, Query, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyEntity } from '../postgres/pg-models/company.entity';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() companyData: CreateCompanyDto): Promise<CompanyEntity> {

    return this.companyService.create(companyData);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() companyData: UpdateCompanyDto): Promise<CompanyEntity> {

    return this.companyService.update(companyData.id, companyData);
  }
}
