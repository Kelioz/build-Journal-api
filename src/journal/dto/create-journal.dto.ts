import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  workTypeId: number;

  @ApiProperty({ example: 24 })
  @IsNumber()
  @Min(0)
  volume: number;

  @ApiProperty({ example: 'м³' })
  @IsString()
  unit: string;

  @ApiProperty({ example: 'Иванов И.И.' })
  @IsString()
  performer: string;

  @ApiProperty({ example: 'Примечание', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
