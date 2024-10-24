import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Tags, FundingRound } from './../../common/enums'; // Import Tags enum

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsArray({ message: 'Tags must be an array' })
  @IsEnum(Tags, { each: true, message: 'Invalid tag value provided' })
  @IsOptional()
  tags: Tags[];

  @IsString()
  @IsNotEmpty({ message: 'Investment Admin is required' })
  investmentAdmin: string;

  @IsEnum(FundingRound, { message: 'Invalid funding round value' })
  @IsNotEmpty({ message: 'Funding round is required' })
  fundingRound: FundingRound;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;
}
