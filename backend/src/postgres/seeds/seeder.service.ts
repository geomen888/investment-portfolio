import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { CompanyEntity } from '../pg-models/company.entity';
import { Tags, FundingRound, GoalInvestmentStatus, InvestmentStatus } from '../../common/enums'
import { InvestmentEntity } from '../pg-models/investment.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly CompanyRepo: Repository<CompanyEntity>,
    @InjectRepository(InvestmentEntity)
    private readonly InvestmentRepo: Repository<InvestmentEntity>,
    private logger: Logger
  ) {}

  async seed(limit: number): Promise<void> {
    try {

      const existingCompany = await this.CompanyRepo.find();
      if (existingCompany.length) {
        console.log('Company already exist, skipping seeding');
        return;
      }

      const companies = [];
      const investments = [];

      for (let i = 0; i < limit; i++) {
        const tags = generateRandom<Tags>(Tags);
        const fundingRound = faker.helpers.enumValue(FundingRound);
        const companyEntity = {
          name: faker.company.name(),
          establishedDate: faker.date.between({ from: '2002-01-01', to: '2022-01-05' }),
          description: faker.company.catchPhrase(),
          tags,
          valuation: faker.finance.amount({
            min: 1000000,
            max: 50000000,
            dec: 0,
          }),
          fundingRound,
          investmentAdmin: faker.person.fullName(),
          verified: faker.datatype.boolean(),
          quantityOfEmployees: faker.number.int({ min: 10, max: 500 }),
          email: faker.internet.email(),
          url: faker.internet.url(),
          address: faker.location.streetAddress(),
          branches: [faker.location.city()],
          countriesOfJurisdiction: [faker.location.country()],
        } as unknown as CompanyEntity;

        const company = this.CompanyRepo.create(companyEntity);
        companies.push(company);

        const investmentEntity = {
          company,
          amount: faker.finance.amount({ min: 100000, max: 1000000, dec: 0 }),
          fundingRound,
          investmentAdmin: faker.person.fullName(),
          quantityOnboardedEmployees: faker.number.int({ min: 10, max: 100 }),
          goalStatus: faker.helpers.enumValue(GoalInvestmentStatus),
          status: faker.helpers.enumValue(InvestmentStatus),
          simulation: false,
        } as unknown as InvestmentEntity;

        const investment = this.InvestmentRepo.create(investmentEntity);

        investments.push(investment);
      }

      await this.CompanyRepo.save(companies);
      await this.InvestmentRepo.save(investments);

      console.log('Database seeding completed successfully.');

      function generateRandom<T>(values): T[] {
        const tagValues = Object.values(values) as T[]; 
        const randomTags = faker.helpers.arrayElements<T>(tagValues); 
        return randomTags;
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}
