import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity } from '../postgres/pg-models/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) { }

  async findPaginate(page: number, limit: number): Promise<CompanyEntity[]> {
    return this.companyRepository.find({
      relations: ['investments'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find({
      relations: ['investments'], order: {
        createdDate: 'DESC',
      }
    });
  }

  async getCompanyById(companyId: string): Promise<CompanyEntity> {
    return this.companyRepository.findOne({
      where: {
        id: companyId
      },
    });
  }

  async create(companyData: Partial<CompanyEntity>): Promise<CompanyEntity> {
    try {
      const company = this.companyRepository.create(companyData);
      return this.companyRepository.save(company);
    } catch (error) {
      throw new BadRequestException('Failed to create a new company');
    }
  }

  async update(id: string, companyData: Partial<CompanyEntity>): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });

      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }

      Object.assign(company, companyData);

      return this.companyRepository.save(company);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
