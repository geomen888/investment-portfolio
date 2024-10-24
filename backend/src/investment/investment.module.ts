import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { CompanyModule } from '../company/company.module';
import { InvestmentEntity } from '../postgres/pg-models/investment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentEntity]), CompanyModule],
  providers: [InvestmentService],
  controllers: [InvestmentController]
})
export class InvestmentModule { }
