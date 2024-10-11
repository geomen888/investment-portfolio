import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CompanyEntity } from './company.entity';
import { FundingRound, InvestmentStatus, Tags, GoalInvestmentStatus } from './../../common/enums';


@Entity('investments')
export class InvestmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @ManyToOne(() => CompanyEntity, company => company.investments)
  company: CompanyEntity;

  @Column('float')
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ nullable: true })
  investmentAdmin: string;

  @Column({
    type: 'enum',
    enum: FundingRound,
    default: FundingRound.PRE_SEED,
  })
  fundingRound: FundingRound;

  @Column({
    type: 'enum',
    array: true,
    enum: Tags,
    default: [],
  })
  tags: Tags[];

  @Column({ nullable: true })
  description: string;

  @Column('int')
  quantityOnboardedEmployees: number;

  @Column({
    type: 'enum',
    enum: GoalInvestmentStatus,
    default: GoalInvestmentStatus.PENDING,
  })
  goalStatus: GoalInvestmentStatus;

  @Column({
    type: 'enum',
    enum: InvestmentStatus,
    default: InvestmentStatus.PENDING,
  })
  status: InvestmentStatus;

  @Column({ default: false })
  simulation: boolean;

  @Column({ nullable: true })
  admin: string;
}
