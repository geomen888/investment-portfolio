import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { FundingRound } from './../../common/enums'
import { InvestmentEntity } from './investment.entity';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  establishedDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array')
  tags: string[];

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => InvestmentEntity, investment => investment.company)
  investments: InvestmentEntity[];

  @Column({ default: false })
  judicialRestrictions: boolean;

  @Column({ nullable: false })
  investmentAdmin: string;

  @Column('float')
  valuation: number;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: FundingRound,
    default: FundingRound.PRE_SEED,
  })
  fundingRound: FundingRound;
  
  @Column({ default: false })
  readyForNextRounds: boolean;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: false })
  address: string;

  @Column('simple-array')
  branches: string[];

  @Column('simple-array')
  countriesOfJurisdiction: string[];

  @Column('int')
  quantityOfEmployees: number;
}
