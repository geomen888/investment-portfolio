import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { FundingRound, InvestmentStatus, GoalInvestmentStatus } from '../../common/enums';

export class CreateInvestmentDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  investmentAdmin: string;

  @IsEnum(FundingRound)
  fundingRound: FundingRound;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(GoalInvestmentStatus)
  goalStatus: GoalInvestmentStatus;

  @IsEnum(InvestmentStatus)
  status: InvestmentStatus;

  @IsString()
  companyId: string;
}
