import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity } from '../postgres/pg-models/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findPaginate(page: number, limit: number): Promise<CompanyEntity[]> {
    return this.companyRepository.find({
      relations: ['investments'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findAll(): Promise<CompanyEntity[]> {
    console.log('all')
    return this.companyRepository.find({ relations: ['investments'] });
  }

  async create(companyData: Partial<CompanyEntity>): Promise<CompanyEntity> {
    const company = this.companyRepository.create(companyData);
    return this.companyRepository.save(company);
  }
}
