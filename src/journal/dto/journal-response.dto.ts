import { ApiProperty } from '@nestjs/swagger';
import { WorkTypeDto } from '../../work-types/dto/work-type.dto';

export class JournalResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: new Date().toISOString() })
  date: string;

  @ApiProperty({ type: WorkTypeDto })
  workType: WorkTypeDto;

  @ApiProperty({ example: 24 })
  volume: number;

  @ApiProperty({ example: 'м³' })
  unit: string;

  @ApiProperty({ example: 'Петров Петр' })
  performer: string;

  @ApiProperty({ example: 'Примечание', required: false })
  notes?: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: string;
}
