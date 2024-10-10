import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ConfigsModule } from './common/config.module';
import { DbPgModule } from './postgres/db-pg.module';
import { CompanyEntity } from './postgres/pg-models/company.entity';
import { InvestmentEntity } from './postgres/pg-models/investment.entity';
import { SeederService } from './postgres/seeds/seeder.service';
import { CompanyModule } from './company/company.module';
import { InvestmentModule } from './investment/investment.module';


@Module({
  imports: [
    ConfigsModule,
    DbPgModule,
    TypeOrmModule.forFeature([CompanyEntity, InvestmentEntity]),
    CompanyModule,
    InvestmentModule
  ],
  providers: [SeederService, Logger],
})
export class AppModule {}
